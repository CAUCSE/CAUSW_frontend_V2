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
    <div
      className="w-full h-24 fixed bottom-0 left-0 bg-default flex justify-center items-center space-x-3 rounded-t-3xl 
      lg:w-40 lg:h-screen lg:top-0 lg:flex-col lg:items-end lg:space-y-10 lg:rounded-tl-none lg:rounded-r-3xl"
    >
      {md || sm ? null : (
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
          className={`w-20 h-16 ${
            firstRouter === iconClass.href ? "bg-white" : "bg-default"
          } rounded-2xl flex flex-col justify-center items-center 
          mb-2 lg:w-11/12 lg:h-24 lg:rounded-l-3xl lg:rounded-r-none lg:mb-0`}
        >
          <span
            className={`${iconClass.icon} ${
              firstRouter === iconClass.href ? "text-default" : "text-white"
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
