"use client";

import { useUserStore } from "@/shared";

export const ProfileImage = ({ src }: { src?: string }) => {
  return (
    <div className="h-24 w-24 overflow-hidden rounded-full shadow-2xl">
      <div
        className="h-24 w-24 bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${src ? src : "/images/default_profile.png"})`,
        }}
      />
    </div>
  );
};
