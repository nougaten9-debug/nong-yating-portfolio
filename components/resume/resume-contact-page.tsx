'use client';

import { useEffect, useState } from 'react';
import { BarChart3, Bot, GraduationCap, Mail, MapPin, MessageCircle, Palette, PenLine } from 'lucide-react';
import { TopNavigation } from '@/components/home/top-navigation';

const experiences = [
  { years: '2026.02—2026.06', role: '内容审稿合作（兼职）', company: '杭州不息品牌管理有限公司', tasks: ['负责柳丝木、安唯伊等品牌达人内容审核与质量把控，推进内容从初稿修改至最终发布', '对接达人及品牌反馈，完成多轮内容修改与沟通协同，保证内容方向与交付质量', '累计完成 60+篇内容质控；柳丝木项目发布34篇，其中 22篇达千互动'] },
  { years: '2024.06—2026.02', role: '内容运营', company: '杭州原恒科技有限公司', tasks: ['负责多品牌小红书内容策略与规划，结合业务目标、产品阶段及目标人群制定内容方向', '将产品卖点与用户需求转化为内容方向、选题及达人沟通角度，推动策略落地', '累计完成 50+份内容规划，覆盖宠物、美妆、母婴、科技数码等多个品类'] },
  { years: '2023.02—2024.06', role: '小红书创意运营', company: '杭州星秀广告科技有限公司', tasks: ['负责品牌小红书内容策划与原创内容生产，覆盖选题、图文内容及品牌账号内容', '参与品牌账号内容运营与优化，结合内容表现持续调整选题与创作方向', '参与30+品牌项目，累计完成160+篇原创内容，累计曝光400w+'] },
  { years: '2019.11—2022.03', role: '新媒体运营', company: '杭州众妙斋文化创意有限公司', tasks: ['从0—1运营 2个微信公众号，独立完成选题、撰稿、排版与日常内容运营', '参与艺术品电商店铺、社群、直播及线上线下活动运营，覆盖内容、用户与转化链路  ', '累计发布 200+篇公众号内容，店铺沉淀4.8万粉丝，策划活动最高成交额达40万+'] },
];

const skills = ['内容策略', '用户洞察', '产品转译', '内容策划', '内容质控', '数据复盘'];
const tools = [
  { label: '内容生产', detail: '小红书 · 微信公众号 · 秀米 · 剪映', Icon: PenLine },
  { label: '数据 & 协作', detail: 'Excel · PowerPoint · 飞书', Icon: BarChart3 },
  { label: '视觉设计', detail: 'Photoshop · Illustrator', Icon: Palette },
  { label: 'AI & 工作流', detail: 'ChatGPT · Codex · Obsidian', Icon: Bot },
];

export function ResumeContactPage() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const scrollRoot = document.querySelector('.id-fixed-scroll');
    const items = Array.from(document.querySelectorAll<HTMLElement>('.id-reveal'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { root: scrollRoot, threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="resume-contact-page id-resume-page id-fixed-page">
      <div className="id-corner-doodle" aria-hidden="true">
        <img src="/assets/resume-contact/bottom-right-doodle.webp" alt="" loading="lazy" decoding="async" />
      </div>
      <section className="id-fixed-canvas">
        <img className="id-fixed-background" src="/assets/resume-contact/badge-background.webp" alt="" width={1920} height={1080} decoding="async" fetchPriority="high" aria-hidden="true" />
        <header className="resume-topbar id-resume-nav">
          <TopNavigation activeItem="resume" hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} />
        </header>

        <div className="id-fixed-scroll">
        <section className="id-fixed-profile" aria-labelledby="resume-name">
          <div className="id-photo-area id-reveal">
            <span className="id-meet-note">Nice<br />to meet<br />you!<br />⌣̈</span>
            <div className="id-polaroid">
              <img className="id-portrait" src="/assets/resume-contact/portrait.webp" alt="农雅婷个人照片" width={900} height={1260} decoding="async" />
              <img className="id-photo-frame" src="/assets/resume-contact/photo-frame.webp" alt="" loading="lazy" decoding="async" aria-hidden="true" />
            </div>
            <div className="id-ip-crop" aria-hidden="true"><img src="/assets/resume-contact/yafafa-working-on-books.webp" alt="" /></div>
            <aside className="id-principle">
              <img src="/assets/resume-contact/principle-note.webp" alt="把喜欢的事情，做成有价值的工作。" />
            </aside>
          </div>

          <div className="id-profile-copy id-reveal id-delay-1">
            <p className="id-hello">Hello! I&apos;m</p>
            <h1 id="resume-name">农雅婷</h1>
            <p className="id-role">AI内容运营/内容策略运营</p>
            <p className="id-bio">6年内容与新媒体经验，近3年深耕小红书品牌内容策略。<br />擅长从业务目标、产品与用户出发，完成内容策略、卖点转译、达人内容质控与复盘优化。<br />目前持续探索 AI 在内容研究、创作与工作流中的实际应用。</p>
          </div>


          <p className="id-story-note id-reveal id-delay-2">Keep<br />Creating</p>

          <div className="id-contact-list id-reveal id-delay-2" aria-label="联系方式">
            <a href="mailto:1125527149@qq.com"><Mail aria-hidden="true" /><span>1125527149@qq.com</span></a>
            <a href="tel:17305814587"><MessageCircle aria-hidden="true" /><span>电话/微信：17305814587</span></a>
            <span><MapPin aria-hidden="true" /><span>杭州（可尽快到岗）</span></span>
          </div>

        </section>

        <section className="id-fixed-details" id="resume-details">
          <section className="id-experience">
            <header className="id-section-title id-reveal"><h2>EXPERIENCE</h2><span>工作经历</span></header>
            <div className="id-timeline">
              {experiences.map((item, index) => (
                <article className="id-job id-reveal" style={{ transitionDelay: `${index * 90}ms` }} key={item.years}>
                  <time>{item.years}</time>
                  <div className="id-job-heading"><h3>{item.role}</h3><p>{item.company}</p></div>
                  <ul>{item.tasks.map((task) => <li key={task}>{task}</li>)}</ul>
                </article>
              ))}
            </div>
          </section>

          <div className="id-side-column">
            <section className="id-info-section id-reveal">
              <header className="id-section-title"><h2>EDUCATION</h2><span>教育背景</span></header>
              <div className="id-education"><GraduationCap className="id-education-icon" aria-hidden="true" /><h3>浙江机电职业技术学院</h3><p>计算机应用技术（前端设计方向）｜专科</p><time>2016.09—2019.06</time></div>
            </section>
            <section className="id-info-section id-reveal id-delay-1">
              <header className="id-section-title"><h2>CORE SKILLS</h2><span>核心能力</span></header>
              <div className="id-skill-tags">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
            </section>
            <section className="id-info-section id-reveal id-delay-1">
              <header className="id-section-title"><h2>TOOLS</h2><span>工具能力</span></header>
              <div className="id-tool-list">
                {tools.map(({ label, detail, Icon }) => (
                  <div className="id-tool-row" key={label}>
                    <span className="id-tool-label"><Icon aria-hidden="true" />{label}</span>
                    <span className="id-tool-detail">{detail}</span>
                  </div>
                ))}
              </div>
              <p className="id-ending-note">More<br />Good Stories<br />To Come.</p>
            </section>
          </div>
        </section>

        <footer className="id-footer-contact">
          感谢阅读 · 期待肯定
        </footer>
        </div>
      </section>
    </main>
  );
}
