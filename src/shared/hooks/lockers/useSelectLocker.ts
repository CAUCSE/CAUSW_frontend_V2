"use client";

import { useLockerSelectionStore } from "@/shared";
import { useShallow } from "zustand/react/shallow";

export const useSelectLocker = () => {
  const { setClickedLockerId, setClickedLockerStatus, clickedLockerId } =
    useLockerSelectionStore(
      useShallow((state) => ({
        setClickedLockerId: state.setClickedLockerId,
        setClickedLockerStatus: state.setClickedLockerStatus,
        clickedLockerId: state.clickedLockerId, // ✅ 상태 가져오기
      })),
    );

  const handleLockerClick = (locker: Locker.LockerResponseDto) => {
    if (clickedLockerId === locker.id) {
      setClickedLockerId(null); // 같은 사물함을 다시 클릭하면 선택 해제
      setClickedLockerStatus(null);
      return;
    }

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
