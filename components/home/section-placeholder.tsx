'use client';

import { useState } from 'react';
import { TopNavigation } from './top-navigation';

export function SectionPlaceholder({ activeItem, label }: { activeItem: string; label: string }) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  return <main className="section-page" aria-label={label}>
    <TopNavigation activeItem={activeItem} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} />
  </main>;
}
