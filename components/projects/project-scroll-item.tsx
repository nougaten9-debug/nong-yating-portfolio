'use client';

import { ArrowUpRight } from 'lucide-react';
import type { Project } from './projects-data';

export function ProjectScrollItem({ project, index, onProjectOpen }: { project: Project; index: number; onProjectOpen: (slug: string) => void }) {
  return <section className="projects-page-section project-scroll-item" data-project-index={index} aria-labelledby={`project-${project.slug}`}>
    <p className="project-scroll-number">{project.number}</p>
    <div className="project-scroll-copy">
      <h2 id={`project-${project.slug}`}>{project.brand}</h2>
      <p className="project-scroll-category">{project.category}</p>
      <p className="project-scroll-hook">{project.hook}</p>
      <div className="project-scroll-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      <button className="project-scroll-link" type="button" onClick={() => onProjectOpen(project.slug)}>
        查看详情 <ArrowUpRight aria-hidden="true" />
      </button>
    </div>
    <div className="project-scroll-mobile-image" aria-hidden="true">
      <span>{project.number} / PROJECT IMAGE</span>
      <img src={project.image} alt="" draggable={false} onError={(event) => { event.currentTarget.hidden = true; }} />
    </div>
  </section>;
}
