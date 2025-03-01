"use client";

import { ToastWithMax } from "@/shared";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
    <>
      <ToastWithMax />
      {children}
    </>
);

export default Layout;