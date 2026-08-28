import type { Dispatch, SetStateAction } from 'react';
import type { DeskItem } from './desk-items';

export function InteractiveObject({ item, active, setHoveredItem, onOpen }: { item: DeskItem; active: boolean; setHoveredItem: Dispatch<SetStateAction<string | null>>; onOpen?: (id: string) => boolean | void }) {
  const enter = () => setHoveredItem(item.id);
  const leave = () => setHoveredItem((current) => current === item.id ? null : current);
  const hotspotStyle = { left: `${item.hotspot.left}%`, top: `${item.hotspot.top}%`, width: `${item.hotspot.width}%`, height: `${item.hotspot.height}%`, clipPath: item.hotspot.clipPath };
  return <>
    <img className={`desk-overlay${active ? ' is-active' : ''}`} src={item.image} alt="" aria-hidden="true" draggable={false} />
    {item.href ? <a className="desk-hotspot feature" href={item.href} aria-label={item.label} onClick={(event) => { if (onOpen?.(item.id)) event.preventDefault(); }} onPointerEnter={enter} onPointerLeave={leave} onFocus={enter} onBlur={leave} onKeyDown={(event) => { if (event.key === ' ') { event.preventDefault(); if (!onOpen?.(item.id)) window.location.assign(item.href!); } }} style={hotspotStyle} /> : <span className="desk-hotspot decor" aria-hidden="true" onPointerEnter={enter} onPointerLeave={leave} style={hotspotStyle} />}
  </>;
}
