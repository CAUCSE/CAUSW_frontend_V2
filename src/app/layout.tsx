import { Suspense } from 'react';

import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import localFont from 'next/font/local';
import Script from 'next/script';

import { LoadingComponent, Providers } from '@/fsd_shared/ui';

import '@/firebase-messaging-sw';
import { GA, ToastWithMax, WindowSizeListener } from '@/fsd_shared';

import './globals.css';

const font = localFont({
  src: [
    {
      path: './font/SpoqaHanSansNeo-Medium.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './font/SpoqaHanSansNeo-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-spoqa',
});
const DynamicAuthAppInitializer = dynamic(
  () => import('@/fsd_widgets/auth/AuthAppInitializer').then((mod) => mod.AuthAppInitializer),
  {
    ssr: false,
    loading: () => <LoadingComponent />,
  },
);
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="ko">
        <head>
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'CAUSW',
                url: 'https://causw.co.kr',
                description:
                  '중앙대학교 소프트웨어학부 동문만 사용할 수 있는 커뮤니티 서비스로, 단순 소셜 네트워크 기능 뿐만 아니라 사물함 신청, 동아리 신청 및 학생회 사업/행사 신청 등 전반적으로 소프트웨어 학부 학생 사회를 하나로 묶어주며, 학생들의 편의를 증진 시켜주는 서비스, CAUSW',
                publisher: {
                  '@type': 'Organization',
                  name: '중앙대학교 소프트웨어학부',
                  url: 'https://sw.cau.ac.kr',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://causw.co.kr/_next/image?url=%2Fimages%2Fsignin-logo.png&w=1920&q=75&dpl=dpl_6awPM6qeGtELn978Q8qm7sMEt2dX',
                  },
                },
              }),
            }}
          />
        </head>
        <body className={`${font.variable} font-sans`}>
          {/* 초기 페이지 진입 시 GA에 페이지 정보를 전송 */}
          <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=G-0MFP0WN799`} />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-0MFP0WN799', {
                page_path: window.location.pathname,
              });
            `,
            }}
          />
          <Providers>
            <Suspense>
              <GA />
            </Suspense>
            <WindowSizeListener />
            <DynamicAuthAppInitializer> {children}</DynamicAuthAppInitializer>
            <ToastWithMax />
          </Providers>
        </body>
      </html>
    </>
  );
}

export const metadata: Metadata = {
  title: 'CAUSW V2',
  description: '중앙대학교 소프트웨어학부 동문을 위한 서비스',
  alternates: {
    canonical: 'https://causw.co.kr/auth/signin',
  },
  icons: {
    icon: [
      { url: '/favicons/icon-96.png', rel: 'icon' },
      {
        url: '/favicons/icon-57.png',
        sizes: '57x57',
        rel: 'apple-touch-icon',
      },
      {
        url: '/favicons/icon-60.png',
        sizes: '60x60',
        rel: 'apple-touch-icon',
      },
      {
        url: '/favicons/icon-72.png',
        sizes: '72x72',
        rel: 'apple-touch-icon',
      },
      {
        url: '/favicons/icon-76.png',
        sizes: '76x76',
        rel: 'apple-touch-icon',
      },
      {
        url: '/favicons/icon-114.png',
        sizes: '114x114',
        rel: 'apple-touch-icon',
      },
      {
        url: '/favicons/icon-120.png',
        sizes: '120x120',
        rel: 'apple-touch-icon',
      },
      {
        url: '/favicons/icon-144.png',
        sizes: '144x144',
        rel: 'apple-touch-icon',
      },
      {
        url: '/favicons/icon-152.png',
        sizes: '152x152',
        rel: 'apple-touch-icon',
      },
      {
        url: '/favicons/icon-180.png',
        sizes: '180x180',
        rel: 'apple-touch-icon',
      },
      {
        url: '/favicons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        rel: 'icon',
      },
      {
        url: '/favicons/icon-32.png',
        sizes: '32x32',
        type: 'image/png',
        rel: 'icon',
      },
      {
        url: '/favicons/icon-96.png',
        sizes: '96x96',
        type: 'image/png',
        rel: 'icon',
      },
      {
        url: '/favicons/icon-16.png',
        sizes: '16x16',
        type: 'image/png',
        rel: 'icon',
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
  viewportFit: 'cover',
};
