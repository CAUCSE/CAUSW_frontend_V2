import type { Metadata } from 'next';
import Script from 'next/script';

import { ErrorMessage } from '@/entities';
import '@/firebase-messaging-sw';
import { GA, WindowSizeListener } from '@/fsd_shared';

import './globals.css';

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
        <body>
          <GA />
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
          <WindowSizeListener />
          <ErrorMessage />
          {children}
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
      { url: 'favicons/favicon-96x96.png', rel: 'icon' },
      {
        url: '/favicons/apple-icon-57x57.png',
        sizes: '57x57',
        rel: 'apple-touch-icon',
      },
      {
        url: '/favicons/apple-icon-60x60.png',
        sizes: '60x60',
        rel: 'apple-touch-icon',
      },
      {
        url: '/favicons/apple-icon-72x72.png',
        sizes: '72x72',
        rel: 'apple-touch-icon',
      },
      {
        url: '/favicons/apple-icon-76x76.png',
        sizes: '76x76',
        rel: 'apple-touch-icon',
      },
      {
        url: '/favicons/apple-icon-114x114.png',
        sizes: '114x114',
        rel: 'apple-touch-icon',
      },
      {
        url: '/favicons/apple-icon-120x120.png',
        sizes: '120x120',
        rel: 'apple-touch-icon',
      },
      {
        url: '/favicons/apple-icon-144x144.png',
        sizes: '144x144',
        rel: 'apple-touch-icon',
      },
      {
        url: '/favicons/apple-icon-152x152.png',
        sizes: '152x152',
        rel: 'apple-touch-icon',
      },
      {
        url: '/favicons/apple-icon-180x180.png',
        sizes: '180x180',
        rel: 'apple-touch-icon',
      },
      {
        url: '/favicons/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        rel: 'icon',
      },
      {
        url: '/favicons/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        rel: 'icon',
      },
      {
        url: '/favicons/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        rel: 'icon',
      },
      {
        url: '/favicons/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
        rel: 'icon',
      },
    ],
  },
};
