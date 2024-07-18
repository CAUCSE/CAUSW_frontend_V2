"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { ProfileImage } from "@/entities";
import { UserService } from "@/shared";

export const SideBar = () => {
  const firstRouter = `/${usePathname().split("/")[1]}`;
  const { getUserInfo } = UserService();

  useEffect(() => {
    if (firstRouter !== "/auth") getUserInfo();
  }, []);

  if (firstRouter === "/auth") return null;

  return (
    <div className="w-72 h-screen fixed top-0 right-0 bg-default flex flex-col justify-center items-end space-y-10">
      <ProfileImage />
    </div>
  );
};
