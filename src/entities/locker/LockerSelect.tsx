"use client";

import { useLockerSelectionStore, useSelectLocker } from "@/shared";

interface LockerSelectProps {
  locker: Locker.LockerResponseDto;
}

export const LockerSelect = ({ locker }: LockerSelectProps) => {
  const { handleLockerClick } = useSelectLocker();
  const clickedLockerId = useLockerSelectionStore((state) => state.clickedLockerId);

  return (
    <button
      className={`h-16 w-16 ${clickedLockerId === locker.id && "border-2 border-[#76C6D1] scale-110 shadow-md"} ${locker.isActive ? "bg-white" : locker.isMine ? "bg-[#76C6D1]" : "bg-[#D9D9D9]"} ${clickedLockerId !== locker.id && locker.isActive && "border border-[#BABABA]"} text-[#686868]`}
      onClick={() => handleLockerClick(locker)}
    >
      {locker.lockerNumber}
    </button>
  );
};
