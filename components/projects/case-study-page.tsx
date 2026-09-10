'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

// Keep the original case-study styles/scripts isolated while the app and audio stay mounted.
export function CaseStudyPage({ name, title }: { name: string; title: string }) {
  const router = useRouter();
  const cleanup = useRef<(() => void) | null>(null);

  useEffect(() => () => cleanup.current?.(), []);

  return <iframe
    className="project-case-frame"
    src={`/${name}-case-study`}
    title={title}
    onLoad={(event) => {
      cleanup.current?.();
      const doc = event.currentTarget.contentDocument;
      if (!doc) return;
      const navigate = (event: MouseEvent) => {
        const target = event.target as Element | null;
        const link = target?.closest('a');
        if (!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        if (!link.classList.contains('back-projects')) return;
        event.preventDefault();
        router.push('/projects');
      };
      doc.addEventListener('click', navigate);
      cleanup.current = () => doc.removeEventListener('click', navigate);
    }}
  />;
}
