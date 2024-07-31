import { SideBar } from "@/widget";
import { NavigationBar } from "@/entities";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationBar />
      <SideBar />
      {children}
    </>
  );
}
