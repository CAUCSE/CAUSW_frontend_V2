"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const NavigationBar = () => {
  const firstRouter = `/${usePathname().split("/")[1]}`;

  if (firstRouter === "/auth") return null;

  return (
    <div className="w-40 h-screen fixed top-0 left-0 bg-default flex flex-col justify-center items-end space-y-10 rounded-r-3xl">
      <Image
        src="/images/cau-logo.png"
        alt="cau logo"
        width={95}
        height={54}
        className="absolute top-6 left-1/2 transform -translate-x-1/2"
      />
      {icons.map((iconClass) => (
        <Link
          key={iconClass.href}
          href={iconClass.href}
          className={`w-11/12 h-24 ${
            firstRouter === iconClass.href ? "bg-white" : "bg-default"
          } rounded-l-3xl flex flex-col justify-center items-center`}
        >
          <span
            className={`${iconClass.icon} ${
              firstRouter === iconClass.href ? "text-default" : "text-white"
            } text-5xl mr-3`}
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
