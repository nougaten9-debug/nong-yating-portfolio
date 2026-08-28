import type { Dispatch, SetStateAction } from 'react';
import { deskItems } from './desk-items';
import { InteractiveObject } from './interactive-object';
export function DeskScene({ hoveredItem, setHoveredItem }: { hoveredItem: string | null; setHoveredItem: Dispatch<SetStateAction<string | null>> }) { return <div className="desk-scene"><img className="desk-base" src="/assets/desk-base.jpg" alt="蓝色背景上的黑白工作桌面，桌前摆放椅子，桌上有电脑、手账、手机、平板与工牌" draggable={false} />{deskItems.map((item) => <InteractiveObject key={item.id} item={item} active={hoveredItem === item.id} setHoveredItem={setHoveredItem} />)}</div>; }
