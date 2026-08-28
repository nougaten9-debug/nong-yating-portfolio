'use client';
import { useState } from 'react';
import { DeskScene } from '@/components/home/desk-scene';
import { TopNavigation } from '@/components/home/top-navigation';
import { AboutBoard } from '@/components/about/about-board';
export default function Home() { const [hoveredItem, setHoveredItem] = useState<string | null>(null); const [aboutOpen, setAboutOpen] = useState(false); const openSection = (id: string) => { if (id !== 'about') return false; setHoveredItem(null); setAboutOpen(true); return true; }; return <main className="home-page"><section className="desk-frame" aria-label="农雅婷的互动工作桌面"><DeskScene hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} onOpen={openSection} /><TopNavigation activeItem={aboutOpen ? 'about' : 'home'} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} onNavigate={openSection} /></section><AboutBoard open={aboutOpen} onClose={() => setAboutOpen(false)} /></main>; }
