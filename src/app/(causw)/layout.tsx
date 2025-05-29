import { NavigationBar, VTwoForm } from '@/entities';
import { SideBar } from '@/widget';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <VTwoForm />
      <NavigationBar />
      <SideBar />
      <main className="absolute top-[58px] left-0 h-[calc(100%-122px)] w-full overflow-y-auto rounded-3xl bg-[#F8F8F8] xl:top-0 xl:left-40 xl:h-screen xl:w-[calc(100%-29rem)]">
        {children}
      </main>
    </>
  );
}
