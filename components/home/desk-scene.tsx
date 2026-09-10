import type { Dispatch, SetStateAction } from 'react';
import { deskItems } from './desk-items';
import { InteractiveObject } from './interactive-object';
export function DeskScene({ hoveredItem, setHoveredItem, onOpen }: { hoveredItem: string | null; setHoveredItem: Dispatch<SetStateAction<string | null>>; onOpen?: (id: string) => boolean | void }) { return <div className="desk-scene"><img className="desk-base" src="/assets/home-base-bw.webp" alt="蓝色水彩背景上的完整工作桌面与椅子" width={1920} height={1080} draggable={false} decoding="async" fetchPriority="high" />{deskItems.map((item) => <InteractiveObject key={item.id} item={item} active={hoveredItem === item.id} setHoveredItem={setHoveredItem} onOpen={onOpen} />)}</div>; }
