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
      <main
        className='absolute top-32 left-0 w-full h-[calc(100%-14rem)]  overflow-y-auto bg-[#F8F8F8] rounded-3xl
        lg:top-0 lg:left-40 lg:w-[calc(100%-29rem)] lg:h-screen'
      >
        {children}
      </main>
    </>
  );
}
