'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { Project } from './projects-data';

const ranovaSections = ['Project Overview', 'Strategy', 'Content Cases', 'Result & Impact'];

export function ProjectDetailModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [project, onClose]);

  if (!project) return null;
  const isRanova = project.slug === 'ranova';

  return <div className="project-detail-overlay" role="presentation">
    <div className="project-detail-dim" aria-hidden="true" />
    <section className="project-detail-panel" role="dialog" aria-modal="true" aria-label={`${project.title} 项目详情`}>
      <button className="project-detail-close" type="button" onClick={onClose} aria-label="关闭项目详情"><X aria-hidden="true" /></button>
      <div className="project-detail-scroll">
        {isRanova ? <>
          <p className="project-detail-kicker">01 / RANOVA</p>
          <h2>朗诺｜宠物食品小红书内容策略</h2>
          <p className="project-detail-lead">低声量 + 多产品并行，<br />内容到底应该先讲什么？</p>
          <p className="project-detail-meta">内容策略规划 × 产品内容转译 × 达人内容规划 × 数据迭代</p>
          <p className="project-detail-date">2023.03—2025.12 ｜ 宠物食品 ｜ 小红书</p>
          <div className="project-detail-outline">
            {ranovaSections.map((section) => <article key={section}>
              <h3>{section}</h3>
              <p>这一部分已预留为朗诺完整 Case Study 内容区，后续可以继续补充策略拆解、内容案例和结果数据。</p>
            </article>)}
          </div>
        </> : <>
          <p className="project-detail-kicker">{project.number} / {project.slug.toUpperCase()}</p>
          <h2>{project.title}</h2>
          <p className="project-detail-lead">Project case study coming soon</p>
          <p className="project-detail-meta">这个项目的详情弹窗结构已经接好，后续可以按 slug 单独补充完整案例。</p>
        </>}
      </div>
    </section>
  </div>;
}
