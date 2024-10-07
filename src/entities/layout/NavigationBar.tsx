"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { useLayoutStore } from "@/shared";

export const NavigationBar = () => {
  const firstRouter = `/${usePathname().split("/")[1]}`;
  const md = useLayoutStore((state) => state.md);
  const sm = useLayoutStore((state) => state.sm);

  return (
    <div className="fixed bottom-0 left-0 flex h-24 w-full items-center justify-center space-x-3 rounded-t-3xl bg-default lg:top-0 lg:h-screen lg:w-40 lg:flex-col lg:items-end lg:space-y-10 lg:rounded-r-3xl lg:rounded-tl-none">
      {md || sm ? null : (
        <Image
          src="/images/cau-logo.png"
          alt="cau logo"
          width={95}
          height={54}
          className="absolute left-1/2 top-6 -translate-x-1/2 transform"
        />
      )}
      {icons.map((iconClass) => (
        <Link
          key={iconClass.href}
          href={iconClass.href}
          className={`h-16 w-20 ${
            firstRouter === iconClass.href ? "bg-[#F8F8F8]" : "bg-default"
          } mb-2 flex flex-col items-center justify-center rounded-2xl lg:mb-0 lg:h-24 lg:w-11/12 lg:rounded-l-3xl lg:rounded-r-none`}
        >
          <span
            className={`${iconClass.icon} ${
              firstRouter === iconClass.href ? "text-default" : "bg-[#F8F8F8]"
            } text-5xl lg:mr-3`}
          ></span>
        </Link>
      ))}
    </div>
  );
};

const icons = [
  { href: "/home", icon: "icon-[iconamoon--home]" },
  { href: "/board", icon: "icon-[material-symbols--post-add-rounded]" },
  { href: "/circle", icon: "icon-[bi--people]" },
  { href: "/setting", icon: "icon-[ep--setting]" },
];
