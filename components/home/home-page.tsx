'use client';
import { useState } from 'react';
import { DeskScene } from '@/components/home/desk-scene';
import { TopNavigation } from '@/components/home/top-navigation';
import { AboutBoard } from '@/components/about/about-board';
import { ContentBoard } from '@/components/content/content-board';

export default function Home({ initialSection = 'home', onProjects }: { initialSection?: 'home' | 'about' | 'content'; onProjects?: () => void }) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [aboutOpen, setAboutOpen] = useState(initialSection === 'about');
  const [contentOpen, setContentOpen] = useState(initialSection === 'content');

  const openSection = (id: string) => {
    if (id === 'projects' && onProjects) {
      onProjects();
      return true;
    }
    if (id === 'about') {
      setHoveredItem(null);
      setAboutOpen(true);
      setContentOpen(false);
      return true;
    }
    if (id === 'content') {
      setHoveredItem(null);
      setContentOpen(true);
      setAboutOpen(false);
      return true;
    }
    return false;
  };

  return (
    <main className="home-page">
      <section className="desk-frame" aria-label="农雅婷的互动工作桌面">
        <DeskScene
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
          onOpen={openSection}
        />
        <TopNavigation
          activeItem={aboutOpen ? 'about' : contentOpen ? 'content' : 'home'}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
          onNavigate={openSection}
        />
      </section>
      <AboutBoard open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <ContentBoard open={contentOpen} onClose={() => setContentOpen(false)} />
    </main>
  );
}
