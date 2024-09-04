import { NavigationBar } from "@/entities";
import { SideBar } from "@/widget";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationBar />
      <SideBar />
      <main className="absolute left-0 top-32 h-[calc(100%-14rem)] w-full overflow-y-auto rounded-3xl bg-[#F8F8F8] lg:left-40 lg:top-0 lg:h-screen lg:w-[calc(100%-29rem)]">
        {children}
      </main>
    </>
  );
}
