import { notFound } from 'next/navigation';
import { SectionPlaceholder } from '@/components/home/section-placeholder';
const allowed = new Set(['about', 'content', 'ai-lab', 'resume-contact']);
export default async function PlaceholderPage({ params }: { params: Promise<{ section: string }> }) { const { section } = await params; if (!allowed.has(section)) notFound(); const activeItem = section === 'resume-contact' ? 'resume' : section; return <SectionPlaceholder activeItem={activeItem} label={`${section} 页面待设计`} />; }
