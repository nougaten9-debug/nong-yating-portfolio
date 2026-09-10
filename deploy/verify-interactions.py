import json
import sys
from urllib.parse import urljoin

from playwright.sync_api import sync_playwright


base = sys.argv[1].rstrip('/') + '/'
result = {}

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(channel='msedge', headless=True)

    opening_context = browser.new_context(viewport={'width': 1440, 'height': 1000})
    opening = opening_context.new_page()
    opening.goto(base, wait_until='commit', timeout=60000)
    opening.wait_for_selector('body', state='attached')
    opening.wait_for_timeout(150)
    result['opening_animation_present'] = opening.get_by_label('欢迎来到我的书桌～').count() > 0
    opening_context.close()

    context = browser.new_context(viewport={'width': 1440, 'height': 1000})
    projects = context.new_page()
    projects.goto(urljoin(base, 'projects/'), wait_until='commit', timeout=60000)
    projects.wait_for_selector('body', state='attached')
    projects.wait_for_selector('.project-scroll-link', state='attached', timeout=60000)
    details = projects.locator('.project-scroll-link')
    result['project_detail_buttons'] = details.count()
    if details.count() >= 2:
        details.nth(1).click(force=True)
        projects.wait_for_timeout(700)
        result['vivo_navigation_url'] = projects.url
    home = context.new_page()
    home.goto(urljoin(base, 'projects/'), wait_until='commit', timeout=60000)
    home.wait_for_selector('body', state='attached')
    home.wait_for_timeout(1000)
    home.get_by_label('返回 Home').click()
    home.wait_for_timeout(1000)
    result['return_home_url'] = home.url

    vivo = context.new_page()
    vivo.goto(urljoin(base, 'vivo-case-study.html'), wait_until='commit', timeout=60000)
    vivo.wait_for_selector('body', state='attached')
    text = vivo.locator('body').inner_text()
    result['vivo_pro_present'] = 'X200 Pro' in text
    result['vivo_mini_present'] = 'Pro mini' in text

    liusimu = context.new_page()
    liusimu.goto(urljoin(base, 'liusimu-case-study.html'), wait_until='commit', timeout=60000)
    liusimu.wait_for_selector('.zoomable-image', state='attached', timeout=60000)
    zoomable = liusimu.locator('.zoomable-image').first
    zoomable.scroll_into_view_if_needed()
    zoomable.click()
    liusimu.wait_for_timeout(300)
    result['lightbox_opened'] = liusimu.locator('#imageLightbox.active').count() > 0
    context.close()
    browser.close()

print(json.dumps(result, ensure_ascii=False, indent=2))
