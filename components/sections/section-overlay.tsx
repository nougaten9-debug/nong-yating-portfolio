'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

export function SectionOverlay({ open, onClose, label, children }: { open: boolean; onClose: () => void; label: string; children: React.ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', closeOnEscape);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', closeOnEscape); };
  }, [open, onClose]);
  if (!open) return null;
  return <div className="section-overlay" role="presentation">
    <div className="section-dim" aria-hidden="true" />
    <section className="section-board" role="dialog" aria-modal="true" aria-label={label}>
      <button className="section-close" type="button" onClick={onClose} aria-label="关闭 About Me"><X aria-hidden="true" /></button>
      {children}
    </section>
  </div>;
}
