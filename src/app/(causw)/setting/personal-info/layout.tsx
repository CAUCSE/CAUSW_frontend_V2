"use client";

import { ToastWithMax } from "@/shared";


const PersonalInfoLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
    <>
      <ToastWithMax/>
      {children}
    </>
);

export default PersonalInfoLayout;