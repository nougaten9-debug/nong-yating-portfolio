'use client';

import { useCallback, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Flame, ListChecks, MousePointer2, Palette, PenLine, Search, Smartphone, Sparkles } from 'lucide-react';
import { SectionOverlay } from '@/components/sections/section-overlay';

const tags = [
  { title: 'INFJ 绿老头', note: '很会共情，也习惯站在不同视角想问题。', art: 'elder' },
  { title: '6年内容人', note: '兜兜转转6年，一直没离开内容。', art: 'timeline' },
  { title: '最近在折腾 AI', note: '研究怎么把 AI 真正用进内容工作。', art: 'ai' },
  { title: '很会改稿', note: '很容易发现“哪里不对”，再一点点改对。', art: 'edit' },
  { title: '对爆款内容敏感', note: '刷到爆款，总会下意识想它为什么火。', art: 'viral' },
  { title: '喜欢总结方法', note: '做完一件事，习惯顺手复盘总结方法。', art: 'method' },
  { title: '自己做过账号', note: '不只帮品牌做内容，也自己下场做账号。', art: 'account' },
  { title: '有点设计底子', note: '做过平面设计，对排版和视觉比较敏感。', art: 'design' },
];

function CardArt({ kind }: { kind: string }) {
  if (kind === 'elder') return <img className="elder-art" src="/assets/about-infjpgreen.png" alt="低多边形绿色老人" draggable={false} />;
  if (kind === 'timeline') return <div className="timeline-art"><span>2020</span><i /><span>2026</span></div>;
  if (kind === 'ai') return <div className="symbol-art"><Sparkles /><b>AI</b><MousePointer2 /></div>;
  if (kind === 'edit') return <div className="symbol-art edit-art"><span>Aa</span><PenLine /><span>Aa✓</span></div>;
  if (kind === 'viral') return <div className="symbol-art"><Flame /><b>10w+</b><Search /><small>WHY?</small></div>;
  if (kind === 'method') return <div className="symbol-art method-art"><ListChecks /><span>01<br/>02<br/>03</span></div>;
  if (kind === 'account') return <div className="symbol-art"><Smartphone /><b>POST</b><span>♡  ···</span></div>;
  return <div className="symbol-art design-art"><b>Aa</b><Palette /><span className="color-chips"><i/><i/><i/></span></div>;
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
      <header className="about-heading"><p>ABOUT ME</p><i aria-hidden="true"/><h1>关于我的一些标签</h1></header>
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
      <footer className="about-details" aria-live="polite"><h2>{active.title}</h2><p>{active.note}</p><div className="about-page"><b>{String(activeIndex + 1).padStart(2, '0')}</b> / 08</div><span className="drag-copy">DRAG TO EXPLORE →</span></footer>
    </div>
  </SectionOverlay>;
}
