'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavigationBar = () => {
  const firstRouter = `/${usePathname().split('/')[1]}`;

  return (
    <div className="fixed bottom-0 left-0 flex h-16 w-full items-start justify-evenly space-x-3 rounded-t-2xl bg-default pt-[3px] xl:top-0 xl:h-screen xl:w-40 xl:flex-col xl:items-end xl:space-y-10 xl:rounded-r-3xl xl:rounded-tl-none">
      <Image
        src="/images/cau-logo.png"
        alt="cau logo"
        width={95}
        height={54}
        className="absolute left-1/2 top-6 -translate-x-1/2 transform max-xl:hidden"
      />

      {icons.map(iconClass => (
        <Link
          key={iconClass.href}
          href={iconClass.href}
          className={`h-[50px] w-[210px] ${
            firstRouter === iconClass.href ? 'bg-[#F8F8F8]' : 'bg-default'
          } flex flex-col items-center justify-center rounded-xl border-[5px] border-default xl:mb-0 xl:h-24 xl:w-11/12 xl:rounded-l-2xl xl:rounded-r-none xl:border-0`}
        >
          <span
            className={`${iconClass.icon} ${
              firstRouter === iconClass.href ? 'text-default' : 'bg-[#F8F8F8]'
            } text-3xl xl:mr-3 xl:text-6xl`}
          />
        </Link>
      ))}
    </div>
  );
};

//TODO: 동아리 제외
const icons = [
  { href: '/home', icon: 'icon-[iconamoon--home]' },
  { href: '/board', icon: 'icon-[material-symbols--post-add-rounded]' },
  //{ href: "/circle", icon: "icon-[bi--people]" },
  { href: '/setting', icon: 'icon-[ep--setting]' },
];
