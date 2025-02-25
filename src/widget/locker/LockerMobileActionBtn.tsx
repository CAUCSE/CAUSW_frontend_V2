"use client";

import {
  LockerExtendBtn,
  LockerRegisterBtn,
  LockerReturnBtn,
} from "@/entities";

import { useLockerSelectionStore } from "@/shared";

export const LockerMobileActionBtn = () => {
  const clickedLockerStatus = useLockerSelectionStore(
    (state) => state.clickedLockerStatus,
  );
  return (
    <div className="fixed bottom-24 md:hidden">
      {clickedLockerStatus === "isActive" && (
        <LockerRegisterBtn isMobile disable={false} />
      )}
      {clickedLockerStatus === "isNotActive" && (
        <LockerRegisterBtn isMobile disable />
      )}
      {clickedLockerStatus === "isMine" && (
        <div className="flex items-center gap-8">
          <LockerReturnBtn isMobile />
          <LockerExtendBtn isMobile disable={false} />
        </div>
      )}
    </div>
  );
};
