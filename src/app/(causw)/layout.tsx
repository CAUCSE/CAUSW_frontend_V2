import { NavigationBar, VTwoForm } from '@/entities';
import { SideBar } from '@/widget';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <VTwoForm />
      <div className="grid h-screen w-full grid-rows-[3.4375rem_1fr_4rem] xl:grid-cols-[10rem_1fr_18rem] xl:grid-rows-none">
        <NavigationBar className="relative hidden h-full w-full xl:block" />
        <SideBar className="relative flex h-full w-full items-center justify-end xl:hidden" />
        <main className="h-full w-full overflow-y-auto rounded-3xl bg-[#F8F8F8]">{children}</main>
        <SideBar className="relative hidden h-full w-full flex-col items-center justify-center xl:flex xl:px-2" />
        <NavigationBar className="block h-full w-full xl:hidden" />
      </div>
    </>
  );
}
