import json
import sys
from urllib.parse import urljoin, urlparse

from playwright.sync_api import sync_playwright


base_url = sys.argv[1].rstrip('/') + '/'
routes = [
    '',
    'projects/',
    'projects/ranova/',
    'projects/vivo/',
    'projects/liusimu/',
    'resume-contact/',
    'ai-lab/',
]
results = {'pages': {}, 'console_errors': [], 'failed_requests': [], 'http_errors': []}


def inspect_page(page, route):
    url = urljoin(base_url, route)
    response = page.goto(url, wait_until='commit', timeout=60000)
    page.wait_for_selector('body', timeout=60000)
    page.wait_for_timeout(1500)
    results['pages'][route or '/'] = {
        'status': response.status if response else None,
        'title': page.title(),
        'images': page.locator('img').count(),
        'broken_images': page.locator('img').evaluate_all(
            "els => els.filter(img => img.complete && img.naturalWidth === 0).map(img => img.currentSrc || img.src)"
        ),
    }


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(channel='msedge', headless=True)
    context = browser.new_context(viewport={'width': 1440, 'height': 1000})
    page = context.new_page()
    page.on('console', lambda message: results['console_errors'].append({
        'url': page.url,
        'text': message.text,
    }) if message.type == 'error' else None)
    page.on('requestfailed', lambda request: results['failed_requests'].append({
        'url': request.url,
        'error': request.failure,
    }))
    page.on('response', lambda response: results['http_errors'].append({
        'url': response.url,
        'status': response.status,
    }) if response.status >= 400 else None)

    for route in routes:
        inspect_page(page, route)

    page.goto(base_url, wait_until='commit', timeout=60000)
    page.wait_for_selector('body', timeout=60000)
    page.wait_for_timeout(1500)
    opening = page.get_by_label('欢迎来到我的书桌～')
    results['opening_animation_present'] = opening.count() > 0

    music = page.get_by_role('button', name='播放背景音乐 Cloud Country')
    if music.count():
        music.click()
        page.wait_for_timeout(800)
        results['music_playing'] = page.get_by_role('button', name='暂停背景音乐 Cloud Country').count() > 0
    else:
        results['music_playing'] = False

    page.goto(urljoin(base_url, 'projects/'), wait_until='commit', timeout=60000)
    page.wait_for_selector('body', timeout=60000)
    page.wait_for_timeout(1500)
    large_image = page.get_by_label('查看大图').first
    if large_image.count():
        large_image.click()
        results['lightbox_opened'] = page.get_by_label('图片大图查看').count() > 0
    else:
        results['lightbox_opened'] = False

    mobile = context.new_page()
    mobile.set_viewport_size({'width': 390, 'height': 844})
    mobile_response = mobile.goto(base_url, wait_until='commit', timeout=60000)
    mobile.wait_for_selector('body', timeout=60000)
    mobile.wait_for_timeout(1500)
    results['mobile'] = {
        'status': mobile_response.status if mobile_response else None,
        'scroll_width': mobile.evaluate('document.documentElement.scrollWidth'),
        'viewport_width': mobile.evaluate('document.documentElement.clientWidth'),
    }
    browser.close()

host = urlparse(base_url).hostname
results['http_errors'] = [item for item in results['http_errors'] if urlparse(item['url']).hostname == host]
print(json.dumps(results, ensure_ascii=False, indent=2))
