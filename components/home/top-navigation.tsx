import type { Dispatch, SetStateAction } from 'react';

const navItems = [
  { id: 'hello', label: '01 Hello', href: '/' }, { id: 'about', label: '02 About Me', href: '/about' },
  { id: 'projects', label: '03 Projects', href: '/projects' }, { id: 'content', label: '04 Content', href: '/content' },
  { id: 'ai-lab', label: '05 AI Lab', href: '/ai-lab' }, { id: 'resume', label: '06 Resume & Contact', href: '/resume-contact' },
];

export function TopNavigation({ hoveredItem, setHoveredItem }: { hoveredItem: string | null; setHoveredItem: Dispatch<SetStateAction<string | null>> }) {
  return <nav className="top-navigation" aria-label="主要导航">{navItems.map((item) => {
    const current = item.id === 'hello'; const linked = hoveredItem === item.id;
    const enter = () => !current && setHoveredItem(item.id);
    const leave = () => !current && setHoveredItem((value) => value === item.id ? null : value);
    return <a key={item.id} className={`nav-item${current ? ' is-current' : ''}${linked ? ' is-linked' : ''}`} href={item.href} aria-current={current ? 'page' : undefined} onPointerEnter={enter} onPointerLeave={leave} onFocus={enter} onBlur={leave}><span>{item.label}</span><i className="navigation-underline" aria-hidden="true" /></a>;
  })}</nav>;
}
