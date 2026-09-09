export type AiLabEntry = {
  id: string;
  number: string;
  title: string;
  notebookTitle: string;
  notebookTag: string;
  notebookIllus: string;
  notebookImages: { src: string; alt: string; cardTitle: string; hint: string }[];
  subtitle: string;
  accent: string;
  coverImage: string;
  category: 'practice' | 'sop';
  background: string;
  reason: string;
  method: string[];
  tools: string[];
  flow: string[];
  sample: string;
  quote: string;
  characterImage?: string;
};

export const aiLabEntries: AiLabEntry[] = [
  {
    id: 'topic-radar', number: '01', title: 'AI每日雷达推送', notebookTitle: 'AI 行业简报',
    notebookTag: '持续更新ing!',
    notebookIllus: '/assets/ai-lab/reader/illus.png',
    notebookImages: [
      { src: '/assets/ai-lab/reader/side-1.png', alt: '数据看板', cardTitle: 'AI每日雷达推送', hint: '追踪 AI 行业重要动态 × 筛选值得关注的信息' },
      { src: '/assets/ai-lab/reader/side-2.png', alt: '行业资讯', cardTitle: 'AI行业资讯', hint: '追踪海外优质创作者× 筛选值得体验的工具' },
      { src: '/assets/ai-lab/reader/side-3.png', alt: '摘要卡片', cardTitle: 'GitHub 项目雷达', hint: '发现近期优质 AI 项目× 快速提炼核心观点' },
      { src: '/assets/ai-lab/reader/side-4.png', alt: '选题推荐', cardTitle: '图文账号选题雷达', hint: '结合图文账号定位× 推荐高潜力选题' },
    ],
    subtitle: '把分散的信息源，变成与我真正相关的每日输入', accent: '#5b9ac9', coverImage: '/assets/ai-lab/books/01-topic-radar.png', category: 'practice',
    background: 'AI信息更新很快，但真正与我的职业方向和内容创作相关的信息有限。相比被动刷信息，我更需要一套稳定、个性化、可持续的每日信息输入机制。',
    reason: '把“今天发什么”的焦虑，变成每天都有候选、每周可以复盘的轻量机制。',
    method: ['围绕个人需求搭建每日自动化雷达', '设定信息源、筛选标准与个性化推荐规则', '自动完成每日搜集、筛选、整理与定时推送'],
    tools: ['ChatGPT', 'codex定时任务', 'obsidian'],
    flow: ['信息进入', 'AI筛选', '选题卡片', '人工确认'],
    sample: '今日候选：当 AI 能直接完成初稿，内容人的判断力具体体现在哪里？',
    quote: '不是获取更多信息，而是让重要信息主动找到我。',
  },
  {
    id: 'ip-visual-skill', number: '02', title: 'AI原创IP配图 Skill', notebookTitle: 'AI原创IP 配图Skill',
    notebookTag: '原创IP 配图 Skill!',
    notebookIllus: '/assets/ai-lab/reader/illus.png',
    notebookImages: [
      { src: '/assets/ai-lab/reader/ip-01.png', alt: '配图1', cardTitle: '原创 IP 角色设定', hint: '固定角色形象与视觉识别' },
      { src: '/assets/ai-lab/reader/ip-02.png', alt: '配图2', cardTitle: '文章场景配图', hint: '根据内容重点生成对应场景' },
      { src: '/assets/ai-lab/reader/ip-03.png', alt: '配图3', cardTitle: 'IP 视觉延展', hint: '拓展不同场景与视觉表达' },
    ],
    subtitle: '基于成熟 Skill，搭建原创 IP 的内容配图与视觉延展能力', accent: '#d8a13c', coverImage: '/assets/ai-lab/books/02-ip-visual.png', category: 'practice',
    background: '日常内容创作中，配图筛选耗时，且不同来源素材容易出现风格不统一、与正文表达不匹配的问题。基于成熟配图 Skill 进行个性化适配，将原创 IP 融入生成流程，在解决日常配图需求的同时，支持更多 IP 视觉延展。',
    reason: '将我的人物设定、视觉规则与文章理解方法封装起来，让配图成为内容的一部分。',
    method: ['基于成熟 Skill，适配个人原创 IP 与使用场景', '建立角色、配色与画风规范，保持视觉一致性', '支持文章场景配图及 IP 多场景视觉延展'],
    tools: ['Codex Skill', '图像生成模型', 'IP 视觉规范'],
    flow: ['文章解析', '场景提炼', '角色约束', '配图生成'],
    sample: '案例：把“反复修改的内容工作”转译成角色伏案擦改、纸屑散落的叙事画面。',
    quote: '让原创IP不只是一个形象，而是一套可以持续生长的视觉语言。',
  },
  {
    id: 'content-skill', number: '03', title: '个人内容创作 Skill', notebookTitle: '个人内容创作 Skill',
    notebookTag: '持续迭代ing!',
    notebookIllus: '/assets/ai-lab/reader/illus.png',
    notebookImages: [
      { src: '/assets/ai-lab/reader/skill-1.png', alt: '配图1', cardTitle: 'Skill 使用规则', hint: '结合账号定位、表达习惯与内容结构<br />将零散想法整理为完整内容' },
      { src: '/assets/ai-lab/reader/skill-3.png', alt: '配图2', cardTitle: '实际生成稿件', hint: '从碎片想法开始<br />快速得到一版可修改的初稿' },
    ],
    subtitle: '结合账号定位与个人表达，将碎片想法整理成可继续创作的内容初稿', accent: '#db828f', coverImage: '/assets/ai-lab/books/03-content-skill.png', category: 'practice',
    background: '日常积累了很多学习记录、工具实践和碎片想法，但从想法到完整内容，仍需要反复梳理角度、结构与表达。因此将个人账号定位、内容方法与表达规则沉淀为 Skill，辅助完成从内容判断到初稿生成的创作过程。',
    reason: '保留真实的表达起点，让 AI 负责梳理，而不是替我制造观点。',
    method: ['匹配个人表达习惯与常用内容结构', '将碎片想法直接整理为可修改的内容初稿', '同步生成标题，降低从零起稿的创作成本'],
    tools: ['ChatGPT', '内容创作 Skill', '质量检查规则'],
    flow: ['碎碎念', '观点提纯', '结构编排', '人工改稿'],
    sample: '输入：“我发现最近不是不会用 AI，是每次都不知道该让它做到哪一步。”',
    quote: 'AI 负责梳理，让创作不再从空白页开始。',
  },
  {
    id: 'content-workflow', number: '04', title: 'AI 辅助图文内容工作流', notebookTitle: '图文账号内容工作流',
    notebookTag: '做高效创作者!',
    notebookIllus: '/assets/ai-lab/reader/illus.png',
    notebookImages: [
      { src: '/assets/ai-lab/reader/tu-01.png', alt: '配图1', cardTitle: 'AI 辅助内容生产流程', hint: '从选题到复盘AI 参与，但不替代最终判断' },
      { src: '/assets/ai-lab/reader/tu-02.png', alt: '配图2', cardTitle: '图文账号每日选题雷达', hint: '结合图文账号定位&目标人群，推送选题' },
      { src: '/assets/ai-lab/reader/tu-03.png', alt: '配图3', cardTitle: '实际生成稿件', hint: '让创作更简单，更有效率' },
    ],
    subtitle: '将 AI 嵌入内容生产流程，保留关键判断与最终决策', accent: '#7fae7f', coverImage: '/assets/ai-lab/books/04-content-workflow.png', category: 'practice',
    background: '图文内容从选题到发布，需要经过研究、创作、包装与复盘等多个环节。将其中适合 AI 处理的任务拆分并串联，减少重复工作，同时保留人工判断与最终决策。',
    reason: '明确人与 AI 的工作边界，让效率提升不以表达失真为代价。',
    method: ['拆解内容生产环节，明确 AI 与人工的任务边界', '串联选题雷达与 4 个内容助手，覆盖研究、创作、包装与复盘', '以发布结果持续复盘，反向优化后续内容判断'],
    tools: ['选题雷达', 'ChatGPT', '内容资产库'],
    flow: ['选题', '整理', '初稿', '判断与发布'],
    sample: '协作原则：AI 扩大处理能力，我对最终表达负责。',
    quote: 'AI 处理重复环节，人保留关键判断',
  },
  {
    id: 'planning-sop', number: '01', title: '内容规划 SOP', notebookTitle: '内容规划 SOP',
    notebookTag: '方法沉淀!',
    notebookIllus: '/assets/ai-lab/reader/illus.png',
    notebookImages: [
      { src: '/assets/ai-lab/reader/guihua-01.png', alt: '配图1', cardTitle: '内容策略规划 SOP 流程', hint: '注释第一行 注释第二行' },
      { src: '/assets/ai-lab/reader/guihua-02.png', alt: '配图2', cardTitle: '森海塞尔无线麦克风&内容规划', hint: '注释第一行 注释第二行' },
      { src: '/assets/ai-lab/reader/guihua-03.png', alt: '配图3', cardTitle: '天津极地海洋度假区&内容规划', hint: '注释第一行 注释第二行' },
    ],
    subtitle: '从业务目标到内容策略与落地规划', accent: '#6fb6c9', coverImage: '/assets/ai-lab/books/sop-01-planning.png', category: 'sop',
    background: '内容规划不是从“想什么选题”开始，而是从业务目标、市场竞争、产品价值与用户需求中推导内容策略，最终通过数据验证持续优化。',
    reason: '用固定问题减少随意选题，让每条内容在整体计划里有清晰任务。',
    method: ['明确业务目标与阶段任务', '分析市场、竞品、产品与用户', '匹配人群 × 痛点 × 场景 × 卖点', '制定内容策略并拆解内容规划', '通过数据验证，持续优化下一轮策略'],
    tools: ['小红书', '聚光后台', '千瓜'],
    flow: ['目标', '问题', '内容角色', '排期'],
    sample: '规划检查：这条内容是在建立认知、解释方法，还是验证表达？',
    quote: '内容规划不是列选题，而是把业务目标翻译成用户愿意看的内容。',
    characterImage: '/assets/ai-lab/reader/sop-character.png',
  },
  {
    id: 'review-sop', number: '02', title: '内容审稿 SOP', notebookTitle: '内容审稿 SOP',
    notebookTag: '方法沉淀!',
    notebookIllus: '/assets/ai-lab/reader/illus.png',
    notebookImages: [
      { src: '/assets/ai-lab/reader/shen-01.png', alt: '数据看板', cardTitle: '内容审稿 SOP 流程', hint: '注释第一行<br />注释第二行' },
      { src: '/assets/ai-lab/reader/shen-02.png', alt: '行业资讯', cardTitle: '安唯伊儿童防晒 × 生物博士妈妈Anna 大纲', hint: '注释第一行<br />注释第二行' },
      { src: '/assets/ai-lab/reader/shen-03.png', alt: '摘要卡片', cardTitle: '安唯伊儿童防晒 × 生物博士妈妈Anna 初稿', hint: '注释第一行<br />注释第二行' },
      { src: '/assets/ai-lab/reader/shen-04.png', alt: '选题推荐', cardTitle: '安唯伊儿童防晒 × 生物博士妈妈Anna 成稿', hint: '注释第一行<br />注释第二行' },
    ],
    subtitle: '从初稿到发布的多阶段内容质控', accent: '#9a86c4', coverImage: '/assets/ai-lab/books/sop-02-review.png', category: 'sop',
    background: '品牌内容从初稿到发布，会经过多轮修改与执行。审稿的核心，是确保方向不偏、信息不错、卖点不漏、最终呈现不走样。',
    reason: '把模糊的“再改改”拆成可执行的检查顺序。',
    method: ['核对内容方向，确保与前期规划一致', '检查内容质量，优化结构、逻辑与吸引力', '校准商业信息，核对品牌、产品与卖点表达', '把控最终呈现，检查镜头 / 配图与内容还原', '发布前终检，复核标题、话题与风险信息'],
    tools: ['内容规划表', '品牌 Brief', '审稿 Checklist'],
    flow: ['观点', '结构', '证据', '语气'],
    sample: '审稿提醒：删掉一句正确但任何人都能说的话。',
    quote: '审稿不是改得更顺，而是确保从初稿到发布，每一步都没有跑偏。',
    characterImage: '/assets/ai-lab/reader/sop-character.png',
  },
  {
    id: 'retro-sop', number: '03', title: '内容复盘 SOP', notebookTitle: '内容复盘 SOP',
    notebookTag: '方法沉淀!',
    notebookIllus: '/assets/ai-lab/reader/illus.png',
    notebookImages: [
      { src: '/assets/ai-lab/reader/fupan-01.png', alt: '数据看板', cardTitle: '内容复盘 SOP 流程', hint: '注释第一行<br />注释第二行' },
      { src: '/assets/ai-lab/reader/fupan-02.png', alt: '行业资讯', cardTitle: '德国双心 × 内容总结', hint: '注释第一行<br />注释第二行' },
      { src: '/assets/ai-lab/reader/fupan-03.png', alt: '摘要卡片', cardTitle: '德国双心 × 优质笔记分析', hint: '注释第一行<br />注释第二行' },
    
    ],
    subtitle: '从数据表现到下一轮内容优化', accent: '#e0a06a', coverImage: '/assets/ai-lab/books/sop-03-retro.png', category: 'sop',
    background: '复盘不只是看数据高低，而是通过内容表现找到有效经验和问题，为下一轮内容策略提供依据。',
    reason: '让每次发布都为下一次决策留下证据，而不是只留下一个数字。',
    method: ['明确复盘目标，结合项目阶段判断内容表现', '整理核心数据，区分高/低表现内容', '拆解内容差异，分析选题、卖点与内容呈现', '提炼有效经验，判断继续、优化或待验证方向', '反哺下一轮策略，持续调整内容方向'],
    tools: ['平台数据后台', '内容数据表', '复盘模板'],
    flow: ['数据', '反馈', '归因', '行动'],
    sample: '复盘输出：保留一个有效模式，修正一个判断，提出一个新问题。',
    quote: '复盘不是解释数据，而是找到下一轮内容该怎么做。”',
    characterImage: '/assets/ai-lab/reader/sop-character.png',
  },
];
