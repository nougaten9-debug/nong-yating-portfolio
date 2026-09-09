'use client';

import { forwardRef } from 'react';
import type { Project } from './projects-data';

type ProjectImageStackProps = {
  projects: Project[];
  onProjectOpen: (slug: string) => void;
};

export const ProjectImageStack = forwardRef<
  HTMLDivElement,
  ProjectImageStackProps
>(({ projects, onProjectOpen }, ref) => {
  return (
    <aside
      className="projects-visual-pin"
      ref={ref}
      aria-label="项目图片"
    >
      <div className="projects-visual-frame">
        {projects.map((project, index) => (
          <div
            className="projects-visual-layer projects-visual-layer-clickable"
            data-project-visual={index}
            key={project.slug}
            role="link"
            tabIndex={0}
            aria-label={`查看 ${project.brand} 项目详情`}
            onClick={() => onProjectOpen(project.slug)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onProjectOpen(project.slug);
              }
            }}
          >
            <span className="projects-visual-placeholder">
              {project.number} / PROJECT IMAGE
            </span>

            <img
              src={project.image}
              alt={`${project.brand} 项目图片`}
              draggable={false}
              onError={(event) => {
                event.currentTarget.hidden = true;
              }}
            />
          </div>
        ))}
      </div>
    </aside>
  );
});

ProjectImageStack.displayName = 'ProjectImageStack';