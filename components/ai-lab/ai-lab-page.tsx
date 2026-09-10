'use client';

import { useEffect, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, Sparkles, X } from 'lucide-react';
import { aiLabEntries, type AiLabEntry } from './ai-lab-data';

const SIDE_IMAGES = [
  { src: '/assets/ai-lab/reader/side-1.webp', alt: '数据看板', cardTitle: 'AI每日雷达推送', hint: '追踪 AI 行业重要动态<br /> × 筛选值得关注的信息' },
  { src: '/assets/ai-lab/reader/side-2.webp', alt: '行业资讯', cardTitle: 'AI 优质博主追踪', hint: '追踪海外优质创作者<br />× 高价值内容推送' },
  { src: '/assets/ai-lab/reader/side-3.webp', alt: '摘要卡片', cardTitle: 'GitHub AI 项目雷达', hint: '发现近期优质 AI 项目<br />× 筛选值得体验的工具' },
  { src: '/assets/ai-lab/reader/side-4.webp', alt: '选题推荐', cardTitle: '图文账号选题雷达', hint: '结合图文账号定位<br />× 推荐高潜力选题' },
];

function Book({ entry, index, onOpen }: { entry: AiLabEntry; index: number; onOpen: (entry: AiLabEntry) => void }) {
  return (
    <button
      className={`ai-book ai-book--${entry.category}`}
      style={{ '--book-delay': `${index * 70}ms`, '--book-color': entry.accent } as React.CSSProperties}
      type="button"
      onClick={() => onOpen(entry)}
      aria-label={`打开 ${entry.title}`}
    >
      <img className="ai-book-art" src={entry.coverImage} alt="" aria-hidden="true" />
    </button>
  );
}

function LabReader({
  entries,
  currentId,
  onSelect,
  onClose,
}: {
  entries: AiLabEntry[];
  currentId: string | null;
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  const [mainIndex, setMainIndex] = useState(0);
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);

  // 切换书时重置主图索引
  useEffect(() => {
    setMainIndex(0);
  }, [currentId]);

  // 切到上一本 / 下一本
  const goPrev = () => {
    if (!currentId) return;
    const idx = entries.findIndex((e) => e.id === currentId);
    if (idx < 0) return;
    const next = entries[(idx - 1 + entries.length) % entries.length];
    onSelect(next.id);
  };
  const goNext = () => {
    if (!currentId) return;
    const idx = entries.findIndex((e) => e.id === currentId);
    if (idx < 0) return;
    const next = entries[(idx + 1) % entries.length];
    onSelect(next.id);
  };

  useEffect(() => {
    if (!currentId) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (zoomSrc) setZoomSrc(null);
        else onClose();
      }
      else if (event.key === 'ArrowLeft') goPrev();
      else if (event.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId, entries, zoomSrc]);

  const entry = entries.find((e) => e.id === currentId) || null;
  if (!entry) return null;

  const sideImages = entry.notebookImages;
  const mainImage = sideImages[mainIndex] || sideImages[0];

  return (
    <div className="ai-reader-overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className={`ai-reader ai-reader--${entry.category}`} role="dialog" aria-modal="true" aria-labelledby="ai-reader-title">
        <button
          className="ai-reader-nav ai-reader-nav--prev"
          type="button"
          onClick={goPrev}
          aria-label="上一本"
          title={entries[(entries.findIndex((e) => e.id === entry.id) - 1 + entries.length) % entries.length].title}
        >
          <ArrowLeft aria-hidden="true" />
        </button>
        <button
          className="ai-reader-nav ai-reader-nav--next"
          type="button"
          onClick={goNext}
          aria-label="下一本"
          title={entries[(entries.findIndex((e) => e.id === entry.id) + 1) % entries.length].title}
        >
          <ArrowRight aria-hidden="true" />
        </button>
        <button className="ai-reader-close" type="button" onClick={onClose} aria-label="关闭阅读窗口"><X aria-hidden="true" /></button>
        <div className="ai-reader-body">
          <div className="ai-reader-copy">
            <p className="ai-reader-kicker">AI LAB</p>
            <h2 id="ai-reader-title">{entry.title}</h2>
            <span className="ai-reader-subtitle">{entry.subtitle}</span>
            <article><h3>项目背景</h3><p>{entry.background}</p></article>
            <article><h3>我做了什么</h3><ol>{entry.method.map((item, i) => <li key={item}><span>{String(i + 1).padStart(2, '0')}</span>{item}</li>)}</ol></article>
            <article><h3>使用工具</h3><div className="ai-reader-tools">{entry.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></article>
          </div>
          <div className="ai-reader-visual">
            {entry.category === 'sop' && <p className="ai-reader-quote ai-reader-quote--sop">{entry.quote}</p>}
            <div className="ai-reader-visual-grid">
              <div className="ai-notebook-card">
                <div className="ai-notebook-dots"><i /><i /><i /></div>
                <div className="ai-notebook-head">
                  <span className="ai-notebook-title"><Sparkles aria-hidden="true" /> {mainImage.cardTitle}</span>
                  <span className="ai-notebook-tag">{entry.notebookTag}</span>
                </div>
                <span className="ai-notebook-divider" aria-hidden="true" />
                <div className="ai-notebook-main">
                  <button
                    type="button"
                    className="ai-notebook-zoom"
                    onClick={() => setZoomSrc(mainImage.src)}
                    aria-label={`查看大图 ${mainImage.alt}`}
                  >
                    <img key={mainImage.src} className="ai-notebook-main-img" src={mainImage.src} alt={mainImage.alt} loading="lazy" />
                  </button>
                </div>
              </div>
              <div className="ai-reader-side">
                {sideImages.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    className={`ai-side-btn${mainIndex === i ? ' is-active' : ''}`}
                    onClick={() => setMainIndex(i)}
                    aria-label={`切换主图为 ${img.alt}`}
                  >
                    <img className="ai-side-img" src={img.src} alt={img.alt} loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
            {entry.category === 'sop' ? (
              entry.characterImage && <img className="ai-reader-char" src={entry.characterImage} alt="IP 角色" loading="lazy" />
            ) : (
              <p className="ai-reader-quote">{entry.quote}</p>
            )}
          </div>
        </div>
      </section>

      {zoomSrc && (
        <div
          className="ai-zoom-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="图片大图查看"
          onMouseDown={(event) => event.target === event.currentTarget && setZoomSrc(null)}
        >
          <button
            type="button"
            className="ai-zoom-close"
            onClick={() => setZoomSrc(null)}
            aria-label="关闭大图"
          >
            <X aria-hidden="true" />
          </button>
          <img className="ai-zoom-img" src={zoomSrc} alt={mainImage.alt} />
        </div>
      )}
    </div>
  );
}

export function AiLabPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const practices = aiLabEntries.filter((entry) => entry.category === 'practice');
  const sops = aiLabEntries.filter((entry) => entry.category === 'sop');
  const allEntries = [...practices, ...sops];

  return (
    <main className="ai-lab-page">
      <a className="ai-lab-home" href="/"><span aria-hidden="true">←</span> HOME</a>
      <div className="ai-lab-shell">
        <aside className="ai-lab-intro">
          <p className="ai-lab-kicker"><span>05 /</span><strong>AI LAB</strong></p>
          <h1>AI实践 <i>&amp;</i><br />方法沉淀</h1>
          <p className="ai-lab-lead">探索AI如何进入内容工作，<br />并沉淀为可复用的方法。</p>
          <div className="ai-lab-principle"><span>MY PRINCIPLE</span><p>AI 扩大处理能力，<br />我保留方向与判断。</p></div>
          <a className="ai-lab-scroll" href="#ai-practice">OPEN THE NOTEBOOK <ArrowDown aria-hidden="true" /></a>
        </aside>

        <div className="ai-lab-library">
          <section className="ai-lab-shelf ai-lab-shelf--practice" id="ai-practice" aria-labelledby="ai-practice-title">
            <header><div><span>MODULE 01</span><h2 id="ai-practice-title">AI实践</h2></div><p>把 AI 放进真实工作，而不是只收藏工具。</p></header>
            <div className="ai-books ai-books--four">{practices.map((entry, index) => <Book key={entry.id} entry={entry} index={index} onOpen={(e) => setActiveId(e.id)} />)}</div>
            <div className="ai-shelf-line" aria-hidden="true"><span /></div>
          </section>

          <section className="ai-lab-shelf ai-lab-shelf--sop" aria-labelledby="ai-sop-title">
            <header><div><span>MODULE 02</span><h2 id="ai-sop-title">方法沉淀 <em>SOP</em></h2></div><p>把做过的事，整理成下一次还能使用的步骤。</p></header>
            <div className="ai-books ai-books--three">{sops.map((entry, index) => <Book key={entry.id} entry={entry} index={index} onOpen={(e) => setActiveId(e.id)} />)}</div>
            <div className="ai-shelf-line" aria-hidden="true"><span /></div>
          </section>
        </div>
      </div>
      <LabReader
        entries={allEntries}
        currentId={activeId}
        onSelect={(id) => setActiveId(id)}
        onClose={() => setActiveId(null)}
      />
    </main>
  );
}
