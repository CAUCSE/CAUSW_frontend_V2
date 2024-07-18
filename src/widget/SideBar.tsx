"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { ProfileImage } from "@/entities";
import { UserService } from "@/shared";

export const SideBar = () => {
  const firstRouter = `/${usePathname().split("/")[1]}`;
  const { getUserInfo } = UserService();

  useEffect(() => {
    getUserInfo();
  }, []);

  if (firstRouter === "/auth") return null;

  return (
    <div className="w-72 h-screen fixed top-0 right-0 bg-white flex flex-col justify-center items-center space-y-10">
      <ProfileImage />
    </div>
  );
};
