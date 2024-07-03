import type { Metadata } from "next";
import { Suspense } from "react";

import { WindowSizeListener, Loading } from "@/entities";

export const metadata: Metadata = {
  title: "CAUSW V2",
  description: "중앙대학교 소프트웨어학부 동문을 위한 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WindowSizeListener />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
}
