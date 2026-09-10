import json
import sys
import time
from urllib.parse import urljoin, urlparse

from playwright.sync_api import sync_playwright


base_url = sys.argv[1].rstrip('/') + '/'
host = urlparse(base_url).hostname
routes = [
    '', 'projects/', 'projects/ranova/', 'projects/vivo/', 'projects/liusimu/',
    'ranova-case-study.html', 'vivo-case-study.html', 'liusimu-case-study.html',
    'resume-contact/', 'ai-lab/'
]
result = {
    'pages': {}, 'console_errors': [], 'failed_requests': [], 'http_errors': [],
    'opening_animation_present': False, 'music_playing': False,
    'lightbox_opened': False, 'mobile': {}, 'elapsed_seconds': 0,
}


def attach(page):
    page.on('console', lambda message: result['console_errors'].append({
        'url': page.url, 'text': message.text,
    }) if message.type == 'error' else None)
    page.on('requestfailed', lambda request: result['failed_requests'].append({
        'url': request.url, 'error': request.failure,
    }))
    page.on('response', lambda response: result['http_errors'].append({
        'url': response.url, 'status': response.status,
    }) if response.status >= 400 and urlparse(response.url).hostname == host else None)


def open_page(context, route, viewport=None):
    page = context.new_page()
    if viewport:
        page.set_viewport_size(viewport)
    attach(page)
    started = time.perf_counter()
    response = page.goto(urljoin(base_url, route), wait_until='commit', timeout=60000)
    page.wait_for_selector('body', state='attached', timeout=60000)
    page.wait_for_timeout(2500)
    elapsed = time.perf_counter() - started
    return page, response, elapsed


started_all = time.perf_counter()
with sync_playwright() as playwright:
    browser = playwright.chromium.launch(channel='msedge', headless=True)
    context = browser.new_context(viewport={'width': 1440, 'height': 1000})

    opening_page, _, _ = open_page(context, '')
    result['opening_animation_present'] = opening_page.get_by_label('欢迎来到我的书桌～').count() > 0
    music = opening_page.locator('.site-music-toggle')
    if music.count():
        music.click()
        opening_page.wait_for_timeout(1000)
        result['music_playing'] = opening_page.evaluate('!window.portfolioMusic.paused')
    opening_page.close()

    for route in routes:
        page, response, elapsed = open_page(context, route)
        if route.endswith('-case-study.html'):
            height = page.evaluate('document.documentElement.scrollHeight')
            for position in range(0, height + 1, 900):
                page.evaluate('(y) => window.scrollTo(0, y)', position)
                page.wait_for_timeout(80)
            page.wait_for_timeout(1500)
        images = page.locator('img')
        result['pages'][route or '/'] = {
            'status': response.status if response else None,
            'elapsed_seconds': round(elapsed, 3),
            'images': images.count(),
            'broken_images': images.evaluate_all(
                "els => els.filter(i => i.complete && i.currentSrc && i.naturalWidth === 0).map(i => i.currentSrc)"
            ),
        }
        page.close()

    lightbox_page, _, _ = open_page(context, 'projects/')
    vivo = lightbox_page.get_by_label('查看 vivo X200系列 项目详情').first
    if vivo.count():
        vivo.click()
        lightbox_page.wait_for_timeout(700)
        large = lightbox_page.get_by_label('查看大图').first
        if large.count():
            large.click()
            result['lightbox_opened'] = lightbox_page.get_by_label('图片大图查看').count() > 0
    lightbox_page.close()

    mobile_page, mobile_response, mobile_elapsed = open_page(
        context, '', {'width': 390, 'height': 844}
    )
    result['mobile'] = {
        'status': mobile_response.status if mobile_response else None,
        'elapsed_seconds': round(mobile_elapsed, 3),
        'scroll_width': mobile_page.evaluate('document.documentElement.scrollWidth'),
        'viewport_width': mobile_page.evaluate('document.documentElement.clientWidth'),
    }
    mobile_page.close()
    browser.close()

result['elapsed_seconds'] = round(time.perf_counter() - started_all, 3)
print(json.dumps(result, ensure_ascii=False, indent=2))
