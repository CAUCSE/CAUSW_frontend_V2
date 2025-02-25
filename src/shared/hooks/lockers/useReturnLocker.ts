"use client";

import { LockerService } from "@/shared/hooks/services/LockerService";
import toast from "react-hot-toast";
import { useLockerSelectionStore } from "@/shared/hooks/stores/locker/useLockerSelectionStore";

export const useReturnLocker = () => {
  const clickedLockerId = useLockerSelectionStore(
    (state) => state.clickedLockerId,
  );
  const { useReturnLocker } = LockerService();

  const { mutate: returnLocker } = useReturnLocker();
  const handleReturnLocker = () => {
    if (!clickedLockerId) {
      toast.error("사물함을 선택해주세요");
      return;
    }
    returnLocker(clickedLockerId);
  };
  return { handleReturnLocker };
};
