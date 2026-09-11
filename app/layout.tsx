import type { Metadata } from 'next';
import { BackgroundMusic } from '@/components/background-music';
import '@fontsource/caveat/400.css';
import 'lxgw-wenkai-webfont/lxgwwenkai-regular.css';
import './globals.css';

export const metadata: Metadata = {
  title: '农雅婷｜AI内容运营作品集',
  description: '农雅婷的交互式工作桌面与个人作品集。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='zh-CN'>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          id="ipad-layout-detection"
          dangerouslySetInnerHTML={{
            __html: "(()=>{const u=navigator.userAgent;const i=/iPad/.test(u)||(/Macintosh/.test(u)&&navigator.maxTouchPoints>0);if(i){document.documentElement.classList.add('is-ipad')}})();",
          }}
        />
      </head>
      <body>{children}<BackgroundMusic /></body>
    </html>
  );
}
