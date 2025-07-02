'use client';

import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import { useLockerRegistration } from '../api';
import { useLockerSelectionStore } from './useLockerSelectionStore';

export const useRegisterLocker = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { clickedLockerId, clickedLockerStatus } = useLockerSelectionStore(
    useShallow((state) => ({
      clickedLockerId: state.clickedLockerId,
      clickedLockerStatus: state.clickedLockerStatus,
    })),
  );
  const { mutate: registerLocker } = useLockerRegistration({ onSuccess });

  const handleRegisterLocker = () => {
    if (!clickedLockerStatus || !clickedLockerId) {
      toast.error('사물함을 선택해주세요');
      return;
    }
    registerLocker(clickedLockerId);
  };
  return { handleRegisterLocker };
};
