'use client';
import { useState } from 'react';
import { DeskScene } from '@/components/home/desk-scene';
import { TopNavigation } from '@/components/home/top-navigation';
import { AboutBoard } from '@/components/about/about-board';
import { ProjectsBoard } from '@/components/projects/projects-board';
export default function Home() { const [hoveredItem, setHoveredItem] = useState<string | null>(null); const [openPanel, setOpenPanel] = useState<'about' | 'projects' | null>(null); const openSection = (id: string) => { if (id !== 'about' && id !== 'projects') return false; setHoveredItem(null); setOpenPanel(id); return true; }; return <main className="home-page"><section className="desk-frame" aria-label="农雅婷的互动工作桌面"><DeskScene hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} onOpen={openSection} /><TopNavigation activeItem={openPanel ?? 'home'} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} onNavigate={openSection} /></section><AboutBoard open={openPanel === 'about'} onClose={() => setOpenPanel(null)} /><ProjectsBoard open={openPanel === 'projects'} onClose={() => setOpenPanel(null)} /></main>; }
