"use client";

import { LockerService, useLockerSelectionStore } from "@/shared";

import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";

export const useRegisterLocker = () => {
  const { clickedLockerId, clickedLockerStatus } = useLockerSelectionStore(
    useShallow((state) => ({
      clickedLockerId: state.clickedLockerId,
      clickedLockerStatus: state.clickedLockerStatus,
    })),
  );

  const { useRegisterLocker } = LockerService();

  const { mutate: registerLocker } = useRegisterLocker();

  const handleRegisterLocker = () => {
    if (!clickedLockerStatus || !clickedLockerId) {
      toast.error("사물함을 선택해주세요");
      return;
    }
    registerLocker(clickedLockerId);
  };
  return { handleRegisterLocker };
};
