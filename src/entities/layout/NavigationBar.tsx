"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { useLayoutStore } from "@/shared";

export const NavigationBar = () => {
  const firstRouter = `/${usePathname().split("/")[1]}`;
  const sm = useLayoutStore((state) => state.sm);

  return (
    <div
      className="w-full h-24 fixed bottom-0 left-0 bg-default flex justify-center items-center space-x-3 rounded-t-3xl 
      md:w-40 md:h-screen md:top-0 md:flex-col md:items-end md:space-y-10 md:rounded-tl-none md:rounded-r-3xl"
    >
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
          className={`w-20 h-16 ${
            firstRouter === iconClass.href ? "bg-white" : "bg-default"
          } rounded-2xl flex flex-col justify-center items-center 
          mb-2 md:w-11/12 md:h-24 md:rounded-l-3xl md:rounded-r-none md:mb-0`}
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
