"use client";

import { useRouter } from "next/navigation";

export const PreviousButton = () => {
  const router = useRouter();
  return (
    <div className="absolute left-0 top-0 m-4 p-4 w-full bg-boardPageBackground">
      <button type="button" onClick={() => router.back()}>
        <div className="flex items-center">
          <span className="pr-4 text-2xl">{"<"}</span>이전
        </div>
      </button>
    </div>
  );
};
