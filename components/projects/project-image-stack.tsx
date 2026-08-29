'use client';

import { forwardRef } from 'react';
import type { Project } from './projects-data';

export const ProjectImageStack = forwardRef<HTMLDivElement, { projects: Project[] }>(({ projects }, ref) => {
  return <aside className="projects-visual-pin" ref={ref} aria-hidden="true">
    <div className="projects-visual-frame">
      {projects.map((project, index) => <div className="projects-visual-layer" data-project-visual={index} key={project.slug}>
        <span className="projects-visual-placeholder">{project.number} / PROJECT IMAGE</span>
        <img src={project.image} alt="" draggable={false} onError={(event) => { event.currentTarget.hidden = true; }} />
      </div>)}
    </div>
  </aside>;
});

ProjectImageStack.displayName = 'ProjectImageStack';
