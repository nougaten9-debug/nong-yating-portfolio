export type DeskItem = {
  id: string; label: string; image: string; href?: string; kind: 'feature' | 'decor';
  hotspot: { left: number; top: number; width: number; height: number; clipPath?: string };
};

export const deskItems: DeskItem[] = [
  { id: 'about', label: 'About Me 我的标签', href: '/about', kind: 'feature', image: '/assets/home-about-color.webp', hotspot: { left: 34.25, top: 12.4, width: 9.2, height: 18.2, clipPath: 'polygon(8% 2%,90% 0,100% 91%,8% 100%,0 12%)' } },
  { id: 'projects', label: 'Projects 项目档案', href: '/projects', kind: 'feature', image: '/assets/home-projects-color.webp', hotspot: { left: 22.1, top: 27.4, width: 22.8, height: 32.1, clipPath: 'polygon(8% 4%,91% 0,100% 88%,92% 100%,7% 91%,0 18%)' } },
  { id: 'content', label: 'Content 个人自然帐', href: '/content', kind: 'feature', image: '/assets/home-content-color.webp', hotspot: { left: 34.4, top: 47.4, width: 9.2, height: 24.7, clipPath: 'polygon(28% 0,88% 4%,100% 94%,29% 100%,0 7%)' } },
  { id: 'ai-lab', label: 'AI Lab AI 实践与沉淀', href: '/ai-lab', kind: 'feature', image: '/assets/home-ai-lab-color.webp', hotspot: { left: 49.1, top: 46.2, width: 18.4, height: 27.8, clipPath: 'polygon(8% 0,96% 7%,100% 91%,92% 100%,0 89%)' } },
  { id: 'resume', label: 'Resume & Contact 关于我', href: '/resume-contact', kind: 'feature', image: '/assets/home-resume-color.webp', hotspot: { left: 68.1, top: 37.5, width: 12.8, height: 29.9, clipPath: 'polygon(20% 12%,70% 0,100% 18%,92% 100%,8% 93%,0 31%)' } },
  { id: 'plant', label: '植物', kind: 'decor', image: '/assets/home-decor-plant-color.webp', hotspot: { left: 23.9, top: 8.4, width: 10.6, height: 21.7, clipPath: 'ellipse(48% 50% at 50% 50%)' } },
  { id: 'pencilcase', label: '左下笔盒与笔记本', kind: 'decor', image: '/assets/home-decor-pencilcase-color.webp', hotspot: { left: 18.0, top: 56.7, width: 12.7, height: 21.4, clipPath: 'polygon(9% 0,100% 24%,90% 100%,0 78%)' } },
  { id: 'coffee-set', label: '咖啡、笔筒与蜡烛', kind: 'decor', image: '/assets/home-decor-coffee-set-color.webp', hotspot: { left: 60.7, top: 16.0, width: 12.9, height: 29.1, clipPath: 'polygon(23% 0,67% 0,70% 34%,100% 34%,100% 100%,0 100%,0 54%,19% 38%)' } },
  { id: 'lamp', label: '台灯', kind: 'decor', image: '/assets/home-decor-lamp-color.webp', hotspot: { left: 69.5, top: 6.8, width: 13.7, height: 30.7, clipPath: 'polygon(0 0,100% 7%,94% 100%,46% 99%,36% 53%,5% 52%)' } },
  { id: 'laptop', label: '中央电脑', kind: 'decor', image: '/assets/home-decor-laptop-color.webp', hotspot: { left: 43.5, top: 9.0, width: 19.1, height: 38.2, clipPath: 'polygon(4% 0,96% 1%,100% 100%,0 100%)' } },
];
