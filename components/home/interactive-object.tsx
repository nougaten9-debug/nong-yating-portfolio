import type { Dispatch, SetStateAction } from 'react';
import type { DeskItem } from './desk-items';

export function InteractiveObject({ item, active, setHoveredItem, onOpen }: { item: DeskItem; active: boolean; setHoveredItem: Dispatch<SetStateAction<string | null>>; onOpen?: (id: string) => boolean | void }) {
  const enter = () => setHoveredItem(item.id);
  const leave = () => setHoveredItem((current) => current === item.id ? null : current);
  const hotspotStyle = { left: `${item.hotspot.left}%`, top: `${item.hotspot.top}%`, width: `${item.hotspot.width}%`, height: `${item.hotspot.height}%`, clipPath: item.hotspot.clipPath };
  return <>
    <img className={`desk-overlay${active ? ' is-active' : ''}`} src={active ? item.image.replace('/assets/', '/assets/responsive/').replace('.webp', '-1280.webp') : undefined} srcSet={active ? `${item.image.replace('/assets/', '/assets/responsive/').replace('.webp', '-640.webp')} 640w, ${item.image.replace('/assets/', '/assets/responsive/').replace('.webp', '-1280.webp')} 1280w, ${item.image} 1920w` : undefined} sizes="100vw" alt="" aria-hidden="true" width={1920} height={1080} draggable={false} decoding="async" fetchPriority="low" />
    {item.href ? <a className="desk-hotspot feature" href={item.href} aria-label={item.label} onClick={(event) => { if (onOpen?.(item.id)) event.preventDefault(); }} onPointerEnter={enter} onPointerLeave={leave} onFocus={enter} onBlur={leave} onKeyDown={(event) => { if (event.key === ' ') { event.preventDefault(); event.currentTarget.click(); } }} style={hotspotStyle} /> : <span className="desk-hotspot decor" aria-hidden="true" onPointerEnter={enter} onPointerLeave={leave} style={hotspotStyle} />}
  </>;
}
