'use client';

import { ArrowUpRight } from 'lucide-react';
import type { Project } from './projects-data';

export function ProjectScrollItem({
  project,
  index,
  onProjectOpen,
}: {
  project: Project;
  index: number;
  onProjectOpen: (slug: string) => void;
}) {
  const openProject = () => onProjectOpen(project.slug);

  return (
    <section
      className="projects-page-section project-scroll-item"
      data-project-index={index}
      aria-labelledby={`project-${project.slug}`}
    >
      <p className="project-scroll-number">{project.number}</p>

      <div
        className="project-scroll-copy project-scroll-copy-clickable"
        role="link"
        tabIndex={0}
        onClick={openProject}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openProject();
          }
        }}
      >
        <h2 id={`project-${project.slug}`}>{project.brand}</h2>
        <p className="project-scroll-category">{project.category}</p>
        <p className="project-scroll-hook">{project.hook}</p>

        <div className="project-scroll-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <button
          className="project-scroll-link"
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            openProject();
          }}
        >
          查看详情 <ArrowUpRight aria-hidden="true" />
        </button>
      </div>

      <div
        className="project-scroll-mobile-image"
        role="link"
        tabIndex={0}
        onClick={openProject}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openProject();
          }
        }}
      >
        <span>{project.number} / PROJECT IMAGE</span>
        <img
          src={project.image}
          alt={`${project.brand} 项目图片`}
          loading="lazy"
          decoding="async"
          draggable={false}
          onError={(event) => {
            event.currentTarget.hidden = true;
          }}
        />
      </div>
    </section>
  );
}

