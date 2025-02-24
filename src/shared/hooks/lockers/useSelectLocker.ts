"use client";

import { useLockerSelectionStore } from "@/shared";
import { useShallow } from "zustand/react/shallow";

export const useSelectLocker = () => {
  const { setClickedLockerId, setClickedLockerStatus } =
    useLockerSelectionStore(
      useShallow((state) => ({
        setClickedLockerId: state.setClickedLockerId,
        setClickedLockerStatus: state.setClickedLockerStatus,
      })),
    );

  const handleLockerClick = (locker: Locker.LockerResponseDto) => {
    setClickedLockerId(locker.id);
    if (locker.isActive) {
      setClickedLockerStatus("isActive");
      return;
    }
    if (locker.isMine) {
      setClickedLockerStatus("isMine");
      return;
    }
    setClickedLockerStatus("isNotActive");
  };

  return { handleLockerClick };
};
