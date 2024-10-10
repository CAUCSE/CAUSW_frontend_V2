import type { Metadata } from "next";
import dynamic from "next/dynamic";

import "./globals.css";

const WindowSizeListener = dynamic(
  () => import("@/shared").then((module) => module.WindowSizeListener),
  { ssr: false },
);

const ErrorMessage = dynamic(
  () => import("@/entities").then((module) => module.ErrorMessage),
  { ssr: false },
);

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
          <ErrorMessage />
          {children}
        </body>
      </html>
    </>
  );
}

export const metadata: Metadata = {
  title: "CAUSW V2",
  description: "중앙대학교 소프트웨어학부 동문을 위한 서비스",
  icons: {
    icon: [
      { url: "favicons/favicon-96x96.png", rel: "icon" },
      {
        url: "/favicons/apple-icon-57x57.png",
        sizes: "57x57",
        rel: "apple-touch-icon",
      },
      {
        url: "/favicons/apple-icon-60x60.png",
        sizes: "60x60",
        rel: "apple-touch-icon",
      },
      {
        url: "/favicons/apple-icon-72x72.png",
        sizes: "72x72",
        rel: "apple-touch-icon",
      },
      {
        url: "/favicons/apple-icon-76x76.png",
        sizes: "76x76",
        rel: "apple-touch-icon",
      },
      {
        url: "/favicons/apple-icon-114x114.png",
        sizes: "114x114",
        rel: "apple-touch-icon",
      },
      {
        url: "/favicons/apple-icon-120x120.png",
        sizes: "120x120",
        rel: "apple-touch-icon",
      },
      {
        url: "/favicons/apple-icon-144x144.png",
        sizes: "144x144",
        rel: "apple-touch-icon",
      },
      {
        url: "/favicons/apple-icon-152x152.png",
        sizes: "152x152",
        rel: "apple-touch-icon",
      },
      {
        url: "/favicons/apple-icon-180x180.png",
        sizes: "180x180",
        rel: "apple-touch-icon",
      },
      {
        url: "/favicons/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        rel: "icon",
      },
      {
        url: "/favicons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
        rel: "icon",
      },
      {
        url: "/favicons/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        rel: "icon",
      },
      {
        url: "/favicons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
        rel: "icon",
      },
    ],
  },
};
