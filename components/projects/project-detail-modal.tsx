'use client';

import { useEffect, useState } from 'react';
import { ExternalLink, X, ZoomIn } from 'lucide-react';
import type { Project } from './projects-data';

const ranovaCases = [
  {
    title: '谁懂！吃小冻干吃出了嗑瓜子的爽感！',
    image: '/assets/projects/ranova/case-01.webp',
    url: 'https://www.xiaohongshu.com/explore/68688b4d000000002001bc0b?xsec_token=ABH6135y74bnYwCQu48niAKnwdpuzAo_Ov385bwJrVYVk=&xsec_source=pc_search',
    data: '6344赞',
  },
  {
    title: '人、咪可是家里漂亮又严谨的安保队长！',
    image: '/assets/projects/ranova/case-02.webp',
    url: 'https://www.xiaohongshu.com/explore/6864dd8a000000001203282a?xsec_token=ABZJXpofhDkgD9FbNyCHNrsWfa5WvyVZNzIi-7bLXJWtM=&xsec_source=pc_search',
    data: '1.7万赞',
  },
  {
    title: '咪看到，咪想要，咪得到',
    image: '/assets/projects/ranova/case-03.webp',
    url: 'https://www.xiaohongshu.com/explore/69412077000000001f00c703?xsec_token=ABkPCxfiGTf7D-mggBK2kCvtC-imM1foMAD_D0GWH3M3U=&xsec_source=pc_search&source=web_search_result_notes',
    data: '7763赞',
  },
  {
    title: '家中无老虎，你小猫称大王',
    image: '/assets/projects/ranova/case-04.webp',
    url: 'https://www.xiaohongshu.com/explore/686a204c0000000012021ef9?xsec_token=ABe3FdZmutmGOo76sX0RJCO0azhoFX5msCLF7uvq0acyE=&xsec_source=pc_search&source=web_search_result_notes',
    data: '3.3万赞',
  },
];

export function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!project) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (zoomSrc) setZoomSrc(null);
        else onClose();
      }
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [project, onClose, zoomSrc]);

  if (!project) return null;

  const isRanova = project.slug === 'ranova';

  const openZoom = (src: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setZoomSrc(src);
  };

  return (
    <div className="project-detail-overlay" role="presentation">
      <div className="project-detail-dim" aria-hidden="true" />

      <section
        className="project-detail-panel"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} 项目详情`}
      >
        <button
          className="project-detail-close"
          type="button"
          onClick={onClose}
          aria-label="关闭项目详情"
        >
          <X aria-hidden="true" />
        </button>

        <div
          className="project-detail-scroll"
          data-lenis-prevent
          data-lenis-prevent-wheel
          onWheel={(event) => {
            event.stopPropagation();
            event.currentTarget.scrollTop += event.deltaY;
          }}
        >
          {isRanova ? (
            <>
              {/* HERO */}
              <header className="case-hero">
                <div className="case-hero-copy">
                  <p className="project-detail-kicker">01 / RANOVA</p>

                  <h2>朗诺｜旗下多款产品内容策略</h2>

                  <p className="project-detail-lead">
                  低声量+多产品并行，如何快速做出内容增长？
                  </p>

                  <p className="project-detail-meta">
                    内容策略规划 × 产品内容转译 × 达人内容规划 × 数据迭代
                  </p>

                  <p className="project-detail-date">
                    2023.03—2025.12 ｜ 宠物食品 ｜ 小红书
                  </p>
                </div>

                <div className="case-hero-image">
                  <button
                    type="button"
                    className="case-zoom-btn"
                    onClick={openZoom('/assets/projects/ranova/hero.webp')}
                    aria-label="查看大图"
                  >
                    <img
                      src="/assets/projects/ranova/hero.webp"
                      alt="朗诺项目视觉"
                    />
                    <span className="case-zoom-icon" aria-hidden="true"><ZoomIn size={18} /></span>
                  </button>
                </div>
              </header>

              {/* 01 项目背景 */}
              <section className="case-section case-overview">
                <div className="case-section-heading">
                  <span>01</span>
                  <h3>项目背景</h3>
                </div>

                <div className="case-overview-grid">
                  <div>
                    <p>
                    朗诺进入小红书推广初期，品牌及核心产品站内声量较低，同时面临冻干赛道竞争激烈、多款新品并行推广的挑战。项目需要在有限认知基础上，快速建立核心产品心智，又需为不同品类找到差异化的内容切口，兼顾后续从品牌种草到购买转化的长期内容承接。
                    </p>
                  </div>

                  <div className="case-role">
                    <p className="case-small-title">我的职责</p>
                    <p>
                    内容策略规划 / 用户与卖点拆解 / 多产品内容规划 / 达人内容方向 / 内容分析 / 阶段复盘与优化
                    </p>
                  </div>
                </div>
              </section>

              {/* 02 我做了什么 */}
              <section className="case-section">
                <div className="case-section-heading">
                  <span>02</span>
                  <h3>我做了什么</h3>
                </div>

                <div className="case-strategy-grid">
  <div className="case-strategy-item">
    <span>01</span>
    <strong>核心产品先打认知</strong>
    <p>
    前期聚焦核心产品，以猫咪吃播、人格化、人宠互动等高兴趣内容打开流量入口，弱化广告感，快速建立产品认知。
    </p>
  </div>

  <div className="case-strategy-item">
    <span>02</span>
    <strong>从核心产品扩展多产品矩阵</strong>
    <p>
    核心产品积累声量后，逐步带动五珍系列、冻干零食、猫砂等产品推广，并将不同卖点转化为真实养宠场景与内容切口。
    </p>
  </div>

  <div className="case-strategy-item">
    <span>03</span>
    <strong>根据产品阶段调整内容任务</strong>
    <p>
    新品侧重兴趣种草与卖点教育，成熟产品增加体验、回购、对比与搜索承接，推动内容从认知种草走向购买转化。
    </p>
  </div>
</div>
              </section>

              {/* 03 代表内容 */}
              <section className="case-section">
                <div className="case-section-heading">
                  <span>03</span>
                  <h3>代表内容</h3>
                </div>

                <div className="case-content-grid">
                  {ranovaCases.map((item) => {
                    const content = (
                      <>
                        <div className="case-content-image">
                          <img src={item.image} alt={item.title} />
                          <button
                            type="button"
                            className="case-zoom-btn case-zoom-btn--corner"
                            onClick={openZoom(item.image)}
                            aria-label={`查看大图 ${item.title}`}
                          >
                            <span className="case-zoom-icon" aria-hidden="true"><ZoomIn size={14} /></span>
                          </button>
                          {item.url && (
                            <span className="case-content-hover">
                              查看原笔记 <ExternalLink size={14} />
                            </span>
                          )}
                        </div>

                        <div className="case-content-info">
                          <strong>{item.title}</strong>
                          <span>{item.data}</span>
                        </div>
                      </>
                    );

                    return item.url ? (
                      <a
                        key={item.title}
                        className="case-content-card"
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {content}
                      </a>
                    ) : (
                      <div
                        key={item.title}
                        className="case-content-card is-disabled"
                      >
                        {content}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* 04 项目结果 */}
              <section className="case-section case-results">
                <div className="case-section-heading">
                  <span>04</span>
                  <h3>项目结果</h3>
                </div>

                <div className="case-results-grid">
                  <div>
                    <strong>344篇</strong>
                    <span>整体发布</span>
                  </div>

                  <div>
                    <strong>3471万+</strong>
                    <span>曝光</span>
                  </div>

                  <div>
                    <strong>478万+</strong>
                    <span>点击</span>
                  </div>

                  <div>
                    <strong>65.6万+</strong>
                    <span>互动</span>
                  </div>

                  <div>
                    <strong>87篇</strong>
                    <span>千互动爆文</span>
                  </div>

                  <div>
                    <strong>25%</strong>
                    <span>爆文率</span>
                  </div>

                  <div>
                    <strong>16%</strong>
                    <span>达人投放 CTR</span>
                  </div>

                  <div>
                    <strong>¥0.29</strong>
                    <span>平均 CPC</span>
                  </div>
                </div>

                <p className="case-results-note">
                  以上为项目团队整体数据。我的核心贡献为不同产品的内容策略规划、
                  达人内容方向及阶段复盘迭代。
                </p>

                <p className="case-ending">
                  从「产品有什么」，转化成「用户为什么愿意看、愿意信、愿意买」。
                </p>
              </section>
            </>
          ) : (
            <>
              <p className="project-detail-kicker">
                {project.number} / {project.slug.toUpperCase()}
              </p>

              <h2>{project.title}</h2>

              <p className="project-detail-lead">
                Project case study coming soon
              </p>

              <p className="project-detail-meta">
                这个项目的详情弹窗结构已经接好，后续可以按项目逐个补充案例。
              </p>
            </>
          )}
        </div>
      </section>

      {zoomSrc && (
        <div
          className="ai-zoom-overlay project-zoom-overlay"
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
          <img className="ai-zoom-img" src={zoomSrc} alt="项目图片大图" />
        </div>
      )}
    </div>
  );
}
