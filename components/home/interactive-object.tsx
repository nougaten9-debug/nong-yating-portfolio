import type { Dispatch, SetStateAction } from 'react';
import type { DeskItem } from './desk-items';

export function InteractiveObject({ item, active, setHoveredItem }: { item: DeskItem; active: boolean; setHoveredItem: Dispatch<SetStateAction<string | null>> }) {
  const enter = () => setHoveredItem(item.id);
  const leave = () => setHoveredItem((current) => current === item.id ? null : current);
  const hotspotStyle = { left: `${item.hotspot.left}%`, top: `${item.hotspot.top}%`, width: `${item.hotspot.width}%`, height: `${item.hotspot.height}%`, clipPath: item.hotspot.clipPath };
  return <>
    <img className={`desk-overlay${active ? ' is-active' : ''}`} src={item.image} alt="" aria-hidden="true" draggable={false} style={{ left: `${item.position.left}%`, top: `${item.position.top}%`, width: `${item.position.width}%`, clipPath: item.overlayClipPath }} />
    {item.href ? <a className="desk-hotspot feature" href={item.href} aria-label={item.label} onPointerEnter={enter} onPointerLeave={leave} onFocus={enter} onBlur={leave} onKeyDown={(event) => { if (event.key === ' ') { event.preventDefault(); window.location.assign(item.href!); } }} style={hotspotStyle} /> : <span className="desk-hotspot decor" aria-hidden="true" onPointerEnter={enter} onPointerLeave={leave} style={hotspotStyle} />}
  </>;
}
