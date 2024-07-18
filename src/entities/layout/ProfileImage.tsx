"use client";

import { useUserStore } from "@/shared";

export const ProfileImage = () => {
  const profileImage = useUserStore((state) => state.profileImage);
  const id = useUserStore((state) => state.id);

  console.log(id);

  return (
    <div
      className="bg-center bg-no-repeat bg-contain"
      style={{ backgroundImage: `url(${profileImage})` }}
    />
  );
};
