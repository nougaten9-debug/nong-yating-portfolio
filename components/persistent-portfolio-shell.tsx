'use client';

import { useEffect, useState } from 'react';
import HomeEntry from '@/components/home/home-entry';
import { ProjectsPage } from '@/components/projects/projects-page';
import { CaseStudyPage } from '@/components/projects/case-study-page';

type ShellView = 'home' | 'projects' | 'ranova';

function sitePath(pathname: string) {
  const base = window.location.pathname.startsWith('/nong-yating-portfolio')
    ? '/nong-yating-portfolio'
    : '';
  if (base && (pathname === base || pathname.startsWith(`${base}/`))) {
    return pathname;
  }
  return `${base}${pathname}`;
}

export default function PersistentPortfolioShell() {
  const [view, setView] = useState<ShellView>('home');

  useEffect(() => {
    window.history.replaceState({ portfolioView: 'home' }, '', window.location.href);
    const restoreView = (event: PopStateEvent) => {
      const nextView = event.state?.portfolioView;
      setView(nextView === 'projects' || nextView === 'ranova' ? nextView : 'home');
    };
    window.addEventListener('popstate', restoreView);
    return () => window.removeEventListener('popstate', restoreView);
  }, []);

  const navigate = (nextView: ShellView, pathname: string) => {
    window.history.pushState({ portfolioView: nextView }, '', sitePath(pathname));
    setView(nextView);
  };

  if (view === 'projects') {
    return <ProjectsPage
      onHome={() => navigate('home', '/')}
      onRanova={() => navigate('ranova', '/projects/ranova')}
    />;
  }

  if (view === 'ranova') {
    return <CaseStudyPage
      name="ranova"
      title="朗诺项目详情"
      onBack={() => navigate('projects', '/projects')}
    />;
  }

  return <HomeEntry onProjects={() => navigate('projects', '/projects')} />;
}
