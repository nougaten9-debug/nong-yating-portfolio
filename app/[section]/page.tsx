import { notFound } from 'next/navigation';
const allowed = new Set(['about', 'projects', 'content', 'ai-lab', 'resume-contact']);
export default async function PlaceholderPage({ params }: { params: Promise<{ section: string }> }) { const { section } = await params; if (!allowed.has(section)) notFound(); return <main aria-label={`${section} 页面待设计`} style={{ minHeight: '100svh', background: '#4f80cf' }} />; }
