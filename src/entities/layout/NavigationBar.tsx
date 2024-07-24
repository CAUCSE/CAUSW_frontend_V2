"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { useLayoutStore } from "@/shared";

export const NavigationBar = () => {
  const firstRouter = `/${usePathname().split("/")[1]}`;
  const sm = useLayoutStore((state) => state.sm);

  return (
    <div className="w-full h-20 md:w-40 md:h-screen fixed bottom-0 md:top-0 left-0 bg-default flex md:flex-col justify-center items-center md:items-end space-x-3 md:space-y-10 rounded-t-3xl md:rounded-r-3xl">
      {sm ? null : (
        <Image
          src="/images/cau-logo.png"
          alt="cau logo"
          width={95}
          height={54}
          className="absolute top-6 left-1/2 transform -translate-x-1/2"
        />
      )}
      {icons.map((iconClass) => (
        <Link
          key={iconClass.href}
          href={iconClass.href}
          className={`w-20 md:w-11/12 h-16 md:h-24 ${
            firstRouter === iconClass.href ? "bg-white" : "bg-default"
          } rounded-2xl md:rounded-l-3xl md:rounded-r-none flex flex-col justify-center items-center`}
        >
          <span
            className={`${iconClass.icon} ${
              firstRouter === iconClass.href ? "text-default" : "text-white"
            } text-5xl md:mr-3`}
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
