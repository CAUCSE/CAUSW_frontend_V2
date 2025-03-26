"use client";

import { ToastWithMax } from "@/shared";


const toastLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
    <>
      <ToastWithMax/>
      {children}
    </>
);

export default toastLayout;
