"use client";

import { useUserStore } from "@/shared";

export const ProfileImage = () => {
  const profileImage = useUserStore((state) => state.profileImage);

  console.log(profileImage);

  return (
    <div className="shadow-2xl rounded-full overflow-hidden">
      <div
        className="w-24 h-24 bg-center bg-no-repeat bg-contain"
        style={{ backgroundImage: `url(${profileImage})` }}
      />
    </div>
  );
};
