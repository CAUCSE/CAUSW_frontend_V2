"use client";

import { ToastWithMax } from "@/shared";


const SignUpLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
    <>
      <ToastWithMax/>
      {children}
    </>
);

export default SignUpLayout;
