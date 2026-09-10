'use client';

import { useLayoutEffect, useState } from 'react';

import OpeningAnimation from '@/components/OpeningAnimation/OpeningAnimation';
import Home from '@/components/home/home-page';

// 模块级变量：同一个 SPA 会话内（不刷新页面）始终保留，刷新后重置
// sessionStorage：即使项目详情页通过整页导航返回 Home，也不会再次播放
let openingPlayedThisSession = false;
let reloadOpeningConsumed = false;
const OPENING_PLAYED_KEY = 'portfolio-opening-played';

function isPageReload() {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  return navigation?.type === 'reload';
}

export default function HomeEntry({ onProjects }: { onProjects?: () => void }) {
  const [openingVisible, setOpeningVisible] = useState(false);

  useLayoutEffect(() => {
    const wasPlayedBeforeNavigation = sessionStorage.getItem(OPENING_PLAYED_KEY) === 'true';
    const enteredByReload = isPageReload();
    const shouldPlay = !openingPlayedThisSession
      && (enteredByReload ? !reloadOpeningConsumed : !wasPlayedBeforeNavigation);

    if (!shouldPlay) {
      return;
    }

    openingPlayedThisSession = true;
    if (enteredByReload) reloadOpeningConsumed = true;
    sessionStorage.setItem(OPENING_PLAYED_KEY, 'true');
    setOpeningVisible(true);
  }, []);

  return (
    <div className={openingVisible ? 'home-entry home-entry--opening' : 'home-entry'}>
      <div className="home-entry__content">
        <Home onProjects={onProjects} />
      </div>
      {openingVisible ? (
        <OpeningAnimation onComplete={() => setOpeningVisible(false)} />
      ) : null}
    </div>
  );
}
