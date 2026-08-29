export const projects = [
  {
    number: '01',
    slug: 'ranova',
    brand: '朗诺',
    category: '宠物食品 · 多品内容策略',
    title: '朗诺｜宠物食品 · 多品内容策略',
    hook: '多个产品一起推，\n内容到底先讲谁？',
    tags: ['宠物食品', '多品内容策略'],
    image: '/assets/projects/ranova.jpg',
  },
  {
    number: '02',
    slug: 'vivo-x200',
    brand: 'vivo X200系列',
    category: '数码3C · 产品内容创意',
    title: 'vivo X200系列｜数码3C · 产品内容创意',
    hook: '当大家都在讲参数，\n新机还能怎么讲出差异？',
    tags: ['数码3C', '新品内容'],
    image: '/assets/projects/vivo-x200.jpg',
  },
  {
    number: '03',
    slug: 'tianjin-polar',
    brand: '天津极地海洋度假区',
    category: '线下文旅 · 暑期引流策略',
    title: '天津极地海洋度假区｜线下文旅 · 暑期引流策略',
    hook: '一个乐园，\n怎么让不同的人都有「想去的理由」？',
    tags: ['线下文旅', '暑期营销'],
    image: '/assets/projects/tianjin-polar.jpg',
  },
  {
    number: '04',
    slug: 'beauty-content',
    brand: '柳丝木 / 安唯伊',
    category: '美妆护肤 · 内容质量优化',
    title: '柳丝木 / 安唯伊｜美妆护肤 · 内容质量优化',
    hook: '卖点都写了，\n为什么内容还是不好看？',
    tags: ['美妆个护', '内容优化'],
    image: '/assets/projects/beauty.jpg',
  },
];

export const clientGroups = [
  { name: '美妆个护', brands: ['943', '苾莱宝', '雨洁', '妇炎洁', '花近', '阿芙', '德美乐嘉', '柳丝木', '爱舒屋'] },
  { name: '宠物', brands: ['朗诺', '海洋之星', '弗列家特', '小佩'] },
  { name: '母婴服饰', brands: ['溜溜侠', '迪辅乐', '安唯伊', 'TKY', 'Kidsland', '贝亲'] },
  { name: '数码3C', brands: ['vivo', '森海塞尔'] },
  { name: '家居', brands: ['志邦', '住范儿', '视贝', '爱空间'] },
  { name: '大健康', brands: ['东阿阿胶', '德国双心', '种德堂', '华润三九', '拉曼', '多特倍斯', '拜尔'] },
  { name: '线下文旅', brands: ['七彩云南', '天津极地海洋度假区'] },
];

export type Project = (typeof projects)[number];
