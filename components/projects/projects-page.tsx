'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Laptop, Leaf, NotebookPen, PenLine, StickyNote } from 'lucide-react';
import { TopNavigation } from '@/components/home/top-navigation';
import { ProjectDetailModal } from './project-detail-modal';
import { ProjectImageStack } from './project-image-stack';
import { ProjectScrollItem } from './project-scroll-item';
import { clientGroups, projects } from './projects-data';

gsap.registerPlugin(ScrollTrigger);

function ProjectsIntroVisual() {
  return <div className="projects-page-intro-visual" aria-hidden="true">
    <div className="projects-page-illus-laptop"><Laptop /></div>
    <div className="projects-page-illus-note"><NotebookPen /><span>content plan</span></div>
    <div className="projects-page-illus-sticky"><StickyNote /><span>why?</span></div>
    <div className="projects-page-illus-pen"><PenLine /></div>
    <div className="projects-page-illus-plant"><Leaf /></div>
  </div>;
}

export function ProjectsPage() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const activeProject = useMemo(() => projects.find((project) => project.slug === activeProjectSlug) ?? null, [activeProjectSlug]);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;
    let lenis: Lenis | null = null;

    if (!reduceMotion) {
      lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    const context = gsap.context(() => {
      const layers = gsap.utils.toArray<HTMLElement>('.projects-visual-layer');
      const items = gsap.utils.toArray<HTMLElement>('.project-scroll-item');
      gsap.set(layers, { zIndex: (index) => index + 1 });
      gsap.set(layers.slice(1), { clipPath: 'inset(100% 0% 0% 0%)', yPercent: 10 });

      items.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 62%',
          end: 'bottom 38%',
          toggleClass: { targets: item, className: 'is-active' },
        });

        gsap.fromTo(item.querySelectorAll('.project-scroll-number, .project-scroll-copy > *'), {
          autoAlpha: 0,
          y: 12,
        }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
          stagger: 0.06,
          scrollTrigger: {
            trigger: item,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        });

        if (index > 0 && layers[index]) {
          gsap.fromTo(layers[index], {
            clipPath: 'inset(100% 0% 0% 0%)',
            yPercent: 10,
          }, {
            clipPath: 'inset(0% 0% 0% 0%)',
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top 76%',
              end: 'top 34%',
              scrub: true,
            },
          });
        }
      });

      ScrollTrigger.create({
        trigger: '.projects-page-clients',
        start: 'top 68%',
        end: 'bottom bottom',
        scrub: true,
        animation: gsap.to(visualRef.current, { autoAlpha: 0, y: -18, ease: 'none' }),
      });
    }, rootRef);

    ScrollTrigger.refresh();

    return () => {
      context.revert();
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return <main className="projects-page" ref={rootRef} aria-label="项目档案">
    <TopNavigation activeItem="projects" hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} />
    <div className="projects-page-layout">
      <div className="projects-page-copy">
        <section className="projects-page-section projects-page-intro" aria-labelledby="projects-page-title">
          <p className="projects-page-kicker"><span>03</span><span>PROJECTS</span></p>
          <h1 id="projects-page-title">项目档案</h1>
          <p className="projects-page-quote">好的内容，不止解决「说什么」<br />更要解决「为什么说、对谁说、怎么说，以及说得对不对」</p>
          <p className="projects-page-scroll-hint">SCROLL TO EXPLORE ↓</p>
        </section>
        {projects.map((project, index) => <ProjectScrollItem key={project.slug} project={project} index={index} onProjectOpen={setActiveProjectSlug} />)}
        <section className="projects-page-section projects-page-clients" aria-labelledby="projects-page-clients-title">
          <p className="projects-page-section-label">SELECTED CLIENTS</p>
          <h2 id="projects-page-clients-title">曾服务品牌</h2>
          <div className="projects-page-clients-grid">
            {clientGroups.map((group) => <article className="projects-page-client-group" key={group.name}>
              <h3>{group.name}</h3>
              <p>{group.brands.join('、')}</p>
            </article>)}
          </div>
        </section>
      </div>
      <div className="projects-page-visuals">
        <div className="projects-page-intro-pin"><ProjectsIntroVisual /></div>
        <ProjectImageStack projects={projects} ref={visualRef} />
      </div>
    </div>
    <ProjectDetailModal project={activeProject} onClose={() => setActiveProjectSlug(null)} />
  </main>;
}
