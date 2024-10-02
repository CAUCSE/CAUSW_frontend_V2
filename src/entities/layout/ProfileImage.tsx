"use client";

import { useUserStore } from "@/shared";

export const ProfileImage = ({ src }: { src?: string }) => {
  const profileImage = useUserStore((state) => state.profileImage);

  return (
    <div className="w-24 h-24 shadow-2xl rounded-full overflow-hidden">
      <div
        className="w-24 h-24 bg-center bg-no-repeat bg-contain"
        style={{ backgroundImage: `url(${src ? src : profileImage})` }}
      />
    </div>
  );
};
