import { notFound } from 'next/navigation';
import Home from '@/components/home/home-page';
const allowed = new Set(['about', 'content']);
export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!allowed.has(section)) notFound();
  return <Home key={section} initialSection={section as 'about' | 'content'} />;
}
