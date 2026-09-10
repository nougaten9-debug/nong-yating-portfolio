export type ViralPost = {
  cover: string;
  title: string;
  url: string;
  views?: string;
  likes?: string;
};

export type ContentAccount = {
  id: string;
  number: string;
  labelEn: string;
  name: string;
  description: string[];
  avatar: string;
  profileUrl: string;
  followers: string;
  engagement: string;
  accentColor: string;
  posts: ViralPost[];
};

export const contentAccounts: ContentAccount[] = [
  {
    id: 'pet',
    number: '01',
    labelEn: 'PET ACCOUNT',
    name: '宠物账号',
    description: ['记录养猫日常，', '分享养宠知识和养猫好物。'],
    avatar: '/assets/content/avatar-pet.webp',
    profileUrl: 'https://www.xiaohongshu.com/user/profile/59ed26114eacab592c9e2411?xsec_token=ABelWLeE_6LiJjIXCFCaQOrpC1mNYRD20I-UvttWz-md4%3D&xsec_source=pc_search',
    followers: '4094',
    engagement: '11.1万',
    accentColor: '#4A90D9',
    tags: ['宠物日常', '真实测评', '治愈陪伴'],
    posts: [
      {
        cover: '/assets/content/pet-post-01.webp',
        title: '新手养猫好物',
        url: 'https://www.xiaohongshu.com/explore/63847b22000000001e03c97d?xsec_token=ABZVT3q-24ksodcInFsmzTQ23mJ2IggqtyYT78AXeM87I=&xsec_source=pc_user',
        views: '2.5万赞',
        likes: '{{PET_POST_01_LIKES}}',
      },
      {
        cover: '/assets/content/pet-post-02.webp',
        title: '趣味种草',
        url: 'https://www.xiaohongshu.com/explore/68a448c0000000001d00f432?xsec_token=CBFgAhpAtACmY1TROsWSWiBfvIx5EUhQScG3ScU29XjW4=&xsec_source=app_share',
        views: '{{PET_POST_02_VIEWS}}',
        likes: '{{PET_POST_02_LIKES}}',
      },
      {
        cover: '/assets/content/pet-post-03.webp',
        title: '养猫日常',
        url: 'https://www.xiaohongshu.com/explore/68c00cb6000000001d0089d7?xsec_token=ABVZnrZ7eOmmK9VnO2k_fHHdgdCZcPU1KtLhyRNnh87PM=&xsec_source=pc_feed',
        views: '{{PET_POST_03_VIEWS}}',
        likes: '{{PET_POST_03_LIKES}}',
      },
      {
        cover: '/assets/content/pet-post-04.webp',
        title: '猫咪互动日常',
        url: 'https://www.xiaohongshu.com/user/profile/59ed26114eacab592c9e2411',
        views: '{{PET_POST_04_VIEWS}}',
        likes: '{{PET_POST_04_LIKES}}',
      },
    ],
  },
  {
    id: 'career',
    number: '02',
    labelEn: 'CAREER ACCOUNT',
    name: '职场账号',
    description: ['分享内容运营、职场思考和AI实践。'],
    avatar: '/assets/content/avatar-career.webp',
    profileUrl: 'https://www.douyin.com/user/MS4wLjABAAAApXJc9Yt6S_PafNUQ6KKwQxdu9nx66yqtfx0TC5dem1Q',
    followers: '2815',
    engagement: '10.5万',
    accentColor: '#5FB5A5',
    posts: [
      {
        cover: '/assets/content/career-post-01.webp',
        title: '面试经验分享',
        url: 'https://www.douyin.com/user/self?from_tab_name=main&modal_id=7199957490266623265',
        views: '{{CAREER_POST_01_VIEWS}}',
        likes: '{{CAREER_POST_01_LIKES}}',
      },
      {
        cover: '/assets/content/career-post-02.webp',
        title: '面试经验分享',
        url: 'https://www.xiaohongshu.com/explore/6a81825a000000002701f4f8?xsec_token=ABI4TgDv5G_j-oUAdTIDISpgqHaM1-Mv0sj1A_UX-lWD8=&xsec_source=pc_search&source=web_user_page',
        views: '{{CAREER_POST_02_VIEWS}}',
        likes: '{{CAREER_POST_02_LIKES}}',
      },
      {
        cover: '/assets/content/career-post-03.webp',
        title: 'AI实践干货分享',
        url: 'https://www.xiaohongshu.com/explore/6a81825a000000002701f4f8?xsec_token=ABI4TgDv5G_j-oUAdTIDISplbiP3LHalw8xviMBZ6fzCA=&xsec_source=pc_search&source=web_user_page',
        views: '{{CAREER_POST_03_VIEWS}}',
        likes: '{{CAREER_POST_03_LIKES}}',
      },
      {
        cover: '/assets/content/career-post-04.webp',
        title: '职场成长复盘',
        url: 'https://www.douyin.com/user/MS4wLjABAAAApXJc9Yt6S_PafNUQ6KKwQxdu9nx66yqtfx0TC5dem1Q',
        views: '{{CAREER_POST_04_VIEWS}}',
        likes: '{{CAREER_POST_04_LIKES}}',
      },
    ],
  },
  {
    id: 'image',
    number: '03',
    labelEn: 'IMAGE CONTENT ACCOUNT',
    name: '图文账号',
    description: ['女性成长 × 状态管理 × 自我提升，', '分享变美变强经验。'],
    avatar: '/assets/content/avatar-image.webp',
    profileUrl: 'https://www.xiaohongshu.com/user/profile/5fb51cc3000000000100baf7',
    followers: '360',
    engagement: '1.6万',
    accentColor: '#E07B8A',
    posts: [
      {
        cover: '/assets/content/image-post-01.webp',
        title: '变美经验分享',
        url: 'https://www.xiaohongshu.com/explore/6a1fee0d00000000220164c1?xsec_token=ABJBGgwfdV3449B1YVuPTPIULRI8cHOKQlnRkEPwV5TL8=&xsec_source=pc_user',
        views: '{{CONTENT_POST_01_VIEWS}}',
        likes: '{{CONTENT_POST_01_LIKES}}',
      },
      {
        cover: '/assets/content/image-post-02.webp',
        title: '美甲合集分享',
        url: 'https://www.xiaohongshu.com/explore/6a745011000000003301d50b?xsec_token=ABNbjdIn-AIcLjm_cg-DZ4C68UhJajsJ8FvlJyWXmyLMc=&xsec_source=pc_user',
        views: '{{CONTENT_POST_02_VIEWS}}',
        likes: '{{CONTENT_POST_02_LIKES}}',
      },
      {
        cover: '/assets/content/image-post-03.webp',
        title: '生活清单分享',
        url: 'https://www.xiaohongshu.com/explore/6a2a81780000000007023e90?xsec_token=ABSLoquWuan__6k4p22ToWMWLRvF4h_scdr33lNipMmUE=&xsec_source=pc_userL',
        views: '{{CONTENT_POST_03_VIEWS}}',
        likes: '{{CONTENT_POST_03_LIKES}}',
      },
      {
        cover: '/assets/content/image-post-04.webp',
        title: '自我提升记录',
        url: 'https://www.xiaohongshu.com/user/profile/5fb51cc3000000000100baf7',
        views: '{{CONTENT_POST_04_VIEWS}}',
        likes: '{{CONTENT_POST_04_LIKES}}',
      },
    ],
  },
];
