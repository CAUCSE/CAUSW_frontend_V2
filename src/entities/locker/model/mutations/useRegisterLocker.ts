'use client';

import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import { useLockerSelectionStore } from '../stores/useLockerSelectionStore';
import { useRegisterLockerMutation } from './useRegisterLockerMutation';

export const useRegisterLocker = ({
  onSuccess,
}: {
  onSuccess?: () => void;
}) => {
  const { clickedLockerId, clickedLockerStatus } = useLockerSelectionStore(
    useShallow((state) => ({
      clickedLockerId: state.clickedLockerId,
      clickedLockerStatus: state.clickedLockerStatus,
    })),
  );
  const { mutate: registerLocker } = useRegisterLockerMutation({ onSuccess });

  const handleRegisterLocker = () => {
    if (!clickedLockerStatus || !clickedLockerId) {
      toast.error('사물함을 선택해주세요');
      return;
    }
    registerLocker(clickedLockerId);
  };
  return { handleRegisterLocker };
};
