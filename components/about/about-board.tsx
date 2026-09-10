'use client';

import { useCallback, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Flame, ListChecks, MousePointer2, Palette, PenLine, Search, Smartphone, Sparkles } from 'lucide-react';
import { SectionOverlay } from '@/components/sections/section-overlay';

const tags = [
  { title: 'INFJ\n绿老头', note: '很会共情，也习惯站在不同视角想问题。', art: 'elder' },
  { title: '6年内容人', note: '兜兜转转6年，一直没离开内容。', art: 'timeline' },
  { title: '最近在折腾 AI', note: '研究怎么把 AI 真正用进内容工作。', art: 'ai' },
  { title: '很会改稿', note: '很容易发现“哪里不对”，再一点点改对。', art: 'edit' },
  { title: '对爆款内容敏感', note: '刷到爆款，总会下意识想它为什么火。', art: 'viral' },
  { title: '喜欢总结方法', note: '做完一件事，习惯顺手复盘总结方法。', art: 'method' },
  { title: '自己做过账号', note: '不只帮品牌做内容，也自己下场做账号。', art: 'account' },
  { title: '有点设计底子', note: '做过平面设计，对排版和视觉比较敏感。', art: 'design' },
];

function CardArt({ kind }: { kind: string }) {
  const artMap: Record<string, string> = {
    elder: '/assets/about-01-infjpgreen.webp',
    timeline: '/assets/about-02-content-years.webp',
    ai: '/assets/about-03-ai.webp',
    edit: '/assets/about-04-edit.webp',
    viral: '/assets/about-05-viral.webp',
    method: '/assets/about-06-method.webp',
    account: '/assets/about-07-account.webp',
    design: '/assets/about-08-design.webp',
  };

  const src = artMap[kind];

  if (!src) return null;

  return (
    <img
      className="tag-art-image"
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}

export function AboutBoard({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStart = useRef<number | null>(null);
  const wheelLock = useRef(false);
  const close = useCallback(() => { onClose(); setActiveIndex(0); }, [onClose]);
  const select = (index: number) => setActiveIndex(Math.max(0, Math.min(tags.length - 1, index)));
  const active = tags[activeIndex];
  return <SectionOverlay open={open} onClose={close} label="关于我的一些标签">
    <div className="about-board" tabIndex={0} onKeyDown={(event) => { if (event.key === 'ArrowLeft') select(activeIndex - 1); if (event.key === 'ArrowRight') select(activeIndex + 1); }}>
      <header className="about-heading"><p>ABOUT ME </p><i aria-hidden="true"/><h1>关于我的一些标签</h1></header>
      <div className="about-carousel-shell">
        <button className="carousel-arrow previous" type="button" aria-label="上一张标签" disabled={activeIndex === 0} onClick={() => select(activeIndex - 1)}><ArrowLeft /></button>
        <div className="about-carousel" onWheel={(event) => { if (Math.abs(event.deltaX) < 8 && Math.abs(event.deltaY) < 8 || wheelLock.current) return; wheelLock.current = true; select(activeIndex + (event.deltaX + event.deltaY > 0 ? 1 : -1)); window.setTimeout(() => { wheelLock.current = false; }, 280); }} onPointerDown={(event) => { dragStart.current = event.clientX; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerUp={(event) => { if (dragStart.current !== null) { const distance = event.clientX - dragStart.current; if (Math.abs(distance) > 42) select(activeIndex + (distance < 0 ? 1 : -1)); } dragStart.current = null; }}>
          <div className="about-track" style={{ transform: `translateX(${-activeIndex * 180 - 80}px)` }}>
            {tags.map((tag, index) => <button key={tag.title} type="button" className={`tag-card${index === activeIndex ? ' is-active' : ''}`} onClick={() => select(index)} aria-current={index === activeIndex ? 'true' : undefined}>
              <span className="card-number">{String(index + 1).padStart(2, '0')}</span><span className="paper-tape" aria-hidden="true"/><CardArt kind={tag.art}/><strong>{tag.title}</strong>
            </button>)}
          </div>
        </div>
        <button className="carousel-arrow next" type="button" aria-label="下一张标签" disabled={activeIndex === tags.length - 1} onClick={() => select(activeIndex + 1)}><ArrowRight /></button>
      </div>
      <footer className="about-details" aria-live="polite"><p>{active.note}</p><div className="about-page"><b>{String(activeIndex + 1).padStart(2, '0')}</b> / 08</div><span className="drag-copy">DRAG TO EXPLORE →</span></footer>
    </div>
  </SectionOverlay>;
}
