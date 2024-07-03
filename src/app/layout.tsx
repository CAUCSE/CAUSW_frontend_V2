import type { Metadata } from "next";
import { Suspense } from "react";

import "./globals.css";

import { WindowSizeListener, Loading } from "@/entities";

export const metadata: Metadata = {
  title: "CAUSW V2",
  description: "중앙대학교 소프트웨어학부 동문을 위한 서비스",
  icons: {
    icon: [
      { url: "icon/favicon-96x96.png", rel: "icon" },
      {
        url: "/icon/apple-icon-57x57.png",
        sizes: "57x57",
        rel: "apple-touch-icon",
      },
      {
        url: "/icon/apple-icon-60x60.png",
        sizes: "60x60",
        rel: "apple-touch-icon",
      },
      {
        url: "/icon/apple-icon-72x72.png",
        sizes: "72x72",
        rel: "apple-touch-icon",
      },
      {
        url: "/icon/apple-icon-76x76.png",
        sizes: "76x76",
        rel: "apple-touch-icon",
      },
      {
        url: "/icon/apple-icon-114x114.png",
        sizes: "114x114",
        rel: "apple-touch-icon",
      },
      {
        url: "/icon/apple-icon-120x120.png",
        sizes: "120x120",
        rel: "apple-touch-icon",
      },
      {
        url: "/icon/apple-icon-144x144.png",
        sizes: "144x144",
        rel: "apple-touch-icon",
      },
      {
        url: "/icon/apple-icon-152x152.png",
        sizes: "152x152",
        rel: "apple-touch-icon",
      },
      {
        url: "/icon/apple-icon-180x180.png",
        sizes: "180x180",
        rel: "apple-touch-icon",
      },
      {
        url: "/icon/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        rel: "icon",
      },
      {
        url: "/icon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
        rel: "icon",
      },
      {
        url: "/icon/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        rel: "icon",
      },
      {
        url: "/icon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
        rel: "icon",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body>
          <WindowSizeListener />
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </body>
      </html>
    </>
  );
}
