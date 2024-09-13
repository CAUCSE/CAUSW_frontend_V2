import { ReactNode } from "react";

export default function HomeSettingLayout({
  modal,
  children,
}: {
  modal: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
