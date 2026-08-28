'use client';
import { useState } from 'react';
import { DeskScene } from '@/components/home/desk-scene';
import { TopNavigation } from '@/components/home/top-navigation';
export default function Home() { const [hoveredItem, setHoveredItem] = useState<string | null>(null); return <main className="home-page"><section className="desk-frame" aria-label="农雅婷的互动工作桌面"><DeskScene hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} /><TopNavigation hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} /></section></main>; }
