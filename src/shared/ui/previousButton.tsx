"use client";

import { useRouter } from "next/navigation";

export const PreviousButton = ({
  routeCallback,
}: {
  routeCallback?: () => void;
}) => {
  const router = useRouter();
  return (
    <div className="absolute left-0 top-0 m-4 bg-boardPageBackground">
      <button
        type="button"
        onClick={() => (routeCallback ? routeCallback() : router.back())}
      >
        <div className="flex items-center">
          <span className="pr-4 text-2xl">{"<"}</span>이전
        </div>
      </button>
    </div>
  );
};
