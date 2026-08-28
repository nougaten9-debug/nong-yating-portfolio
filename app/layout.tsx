import type { Metadata } from 'next';
import '@fontsource/caveat/400.css';
import '@fontsource/noto-serif-sc/400.css';
import '@fontsource/noto-sans-sc/400.css';
import '@fontsource/noto-sans-sc/500.css';
import '@fontsource/lxgw-wenkai/500.css';
import './globals.css';

export const metadata: Metadata = {
  title: '农雅婷｜内容策略运营',
  description: '农雅婷的交互式工作桌面与个人作品集。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN"><body>{children}</body></html>
  );
}
