export const projects = [
  {
    number: '01',
    slug: 'ranova',
    brand: '朗诺 ',
    category: '宠物冻干/猫粮/零食 · 多品内容策略',
    title: '朗诺｜宠物食品 · 多品内容策略',
    hook: '低声量品牌首次入场，如何搭建多产品内容策略？',
    tags: ['宠物食品', '多品内容策略'],
    image: '/assets/projects/lang.webp',
  },
  {
    number: '02',
    slug: 'vivo-x200',
    brand: 'vivo X200系列',
    category: '数码3C · 新品内容创意策略',
    title: 'vivo X200系列｜数码3C · 产品内容创意',
    hook: '既定命题下，如何做出吸引人的内容创意？',
    tags: ['数码3C', '新品内容'],
    image: '/assets/projects/vivo.webp',
  },

  
  {
    number: '03',
    slug: 'beauty-content',
    brand: '柳丝木',
    category: '美妆护肤 · 达人内容审稿质控与改稿',
    title: '柳丝木/安唯伊｜美妆护肤 · 内容质量优化',
    hook: '达人内容质控，如何把「品牌要说的」改成「用户愿意看的」？',
    tags: ['美妆护肤', '内容审稿', '内容优化'],
    image: '/assets/projects/liu.webp',
  },

];

export const clientGroups = [
  { name: '美妆个护', brands: ['943', '苾莱宝', '雨洁', '妇炎洁', '花近', '阿芙', '德美乐嘉', '柳丝木', '爱舒屋'] },
  { name: '宠物', brands: ['朗诺', '海洋之星', '弗列加特', '小佩'] },
  { name: '母婴服饰', brands: ['溜溜侠', '迪辅乐', '安唯伊', 'TKY', 'Kidsland', '贝亲'] },
  { name: '数码3C', brands: ['vivo', '森海塞尔'] },
  { name: '家居', brands: ['志邦', '住范儿', '视贝', '爱空间'] },
  { name: '大健康', brands: ['东阿阿胶', '德国双心', '种德堂', '华润三九', '拉曼', '多特倍斯', '拜尔'] },
  { name: '线下文旅', brands: ['七彩云南', '天津极地海洋度假区等'] },
];

export type Project = (typeof projects)[number];
