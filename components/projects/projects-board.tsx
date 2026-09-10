'use client';

import { ArrowRight, Laptop, Leaf, NotebookPen, PenLine, StickyNote } from 'lucide-react';
import { SectionOverlay } from '@/components/sections/section-overlay';

const projects = [
  {
    number: '01',
    slug: 'ranova',
    title: '朗诺｜宠物食品 · 多品内容策略',
    question: '多个产品一起推，内容到底先讲谁？',
    tags: ['宠物食品', '多品内容策略'],
    image: '/assets/projects/ranova.webp',
  },
  {
    number: '02',
    slug: 'vivo-x200',
    title: 'vivo X200系列｜数码3C · 产品内容创意',
    question: '当大家都在讲参数，新机还能怎么讲出差异？',
    tags: ['数码3C', '产品内容创意'],
    image: '/assets/projects/vivo-x200.webp',
  },
  {
    number: '03',
    slug: 'tianjin-polar',
    title: '天津极地海洋度假区｜线下文旅 · 暑期引流策略',
    question: '一个乐园，怎么让不同的人都有「想去的理由」？',
    tags: ['线下文旅', '暑期引流策略'],
    image: '/assets/projects/tianjin-polar.webp',
  },
  {
    number: '04',
    slug: 'beauty-content',
    title: '柳丝木 / 安唯伊｜美妆护肤 · 内容质量优化',
    question: '卖点都写了，为什么内容还是不好看？',
    tags: ['美妆护肤', '内容质量优化'],
    image: '/assets/projects/beauty.webp',
  },
];

const clientGroups = [
  { name: '美妆个护', lines: ['943 / 苾莱宝 / 雨洁 / 妇炎洁', '花近 / 阿芙 / 德美乐嘉', '柳丝木 / 爱舒屋'] },
  { name: '宠物', lines: ['朗诺 / 海洋之星', '弗列加特 / 小佩'] },
  { name: '母婴服饰', lines: ['溜溜侠 / 迪辅乐', '安唯伊 / TKY', 'Kidsland / 贝亲'] },
  { name: '数码3C', lines: ['vivo / 森海塞尔'] },
  { name: '家居', lines: ['志邦 / 住范儿', '视贝 / 爱空间'] },
  { name: '大健康', lines: ['东阿阿胶 / 德国双心 / 种德堂', '华润三九 / 拉曼 / 多特倍斯 / 拜尔'] },
  { name: '线下文旅', lines: ['七彩云南 / 天津极地海洋度假区'] },
];

function ProjectIllustration() {
  return <div className="projects-illustration" aria-hidden="true">
    <div className="projects-illus-laptop"><Laptop /></div>
    <div className="projects-illus-note"><NotebookPen /><span>content plan</span></div>
    <div className="projects-illus-sticky"><StickyNote /><span>why?</span></div>
    <div className="projects-illus-pen"><PenLine /></div>
    <div className="projects-illus-plant"><Leaf /></div>
  </div>;
}

function ProjectRow({ project, onProjectOpen }: { project: (typeof projects)[number]; onProjectOpen: (slug: string) => void }) {
  return <button className="project-row" type="button" onClick={() => onProjectOpen(project.slug)}>
    <span className="project-number">{project.number}</span>
    <span className="project-image-wrap">
      <span className="project-image-placeholder">PROJECT IMAGE</span>
      <img src={project.image} alt="" draggable={false} onError={(event) => { event.currentTarget.hidden = true; }} />
    </span>
    <span className="project-copy">
      <strong>{project.title}</strong>
      <span className="project-question">{project.question}</span>
      <span className="project-tags">{project.tags.map((tag) => <i key={tag}>{tag}</i>)}</span>
    </span>
    <ArrowRight className="project-arrow" aria-hidden="true" />
  </button>;
}

export function ProjectsBoard({ open, onClose }: { open: boolean; onClose: () => void }) {
  const onProjectOpen = (slug: string) => {
    console.info('Project case study placeholder:', slug);
  };

  return <SectionOverlay open={open} onClose={onClose} label="项目档案">
    <div className="projects-board">
      <div className="projects-scroll">
        <section className="projects-intro" aria-labelledby="projects-title">
          <div>
            <p className="projects-kicker"><span>03</span><span>PROJECTS</span></p>
            <h1 id="projects-title">项目档案</h1>
            <p className="projects-quote">好的内容，不止解决「说什么」，<br />更要解决「为什么说、对谁说、怎么说，以及说得对不对」。</p>
          </div>
          <ProjectIllustration />
        </section>

        <section className="projects-section" aria-labelledby="selected-projects-title">
          <div className="projects-section-heading">
            <p>SELECTED PROJECTS</p>
            <h2 id="selected-projects-title">精选项目</h2>
          </div>
          <div className="project-list">
            {projects.map((project) => <ProjectRow key={project.slug} project={project} onProjectOpen={onProjectOpen} />)}
          </div>
        </section>

        <section className="clients-section" aria-labelledby="selected-clients-title">
          <div className="projects-section-heading">
            <p>SELECTED CLIENTS</p>
            <h2 id="selected-clients-title">曾服务品牌</h2>
          </div>
          <div className="clients-grid">
            {clientGroups.map((group) => <div className="client-group" key={group.name}>
              <h3>{group.name}</h3>
              {group.lines.map((line) => <p key={line}>{line}</p>)}
            </div>)}
          </div>
        </section>
      </div>
    </div>
  </SectionOverlay>;
}
