"use client";

import { useSelectLocker } from "@/shared";

interface LockerSelectProps {
  locker: Locker.LockerResponseDto;
}

export const LockerSelect = ({ locker }: LockerSelectProps) => {
  const { handleLockerClick } = useSelectLocker();

  return (
    <button
      className={`h-16 w-16 ${locker.isActive ? "bg-white" : locker.isMine ? "bg-[#76C6D1]" : "bg-[#D9D9D9]"} ${locker.isActive && "border border-[#BABABA]"} text-[#686868]`}
      onClick={() => handleLockerClick(locker)}
    >
      {locker.lockerNumber}
    </button>
  );
};
