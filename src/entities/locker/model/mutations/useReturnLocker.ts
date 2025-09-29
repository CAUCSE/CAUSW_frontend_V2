'use client';

import toast from 'react-hot-toast';

import { useReturnLockerMutation } from '../mutations';
import { useLockerSelectionStore } from '../stores/useLockerSelectionStore';

export const useReturnLocker = () => {
  const clickedLockerId = useLockerSelectionStore((state) => state.clickedLockerId);

  const { mutate: returnLocker } = useReturnLockerMutation();
  const handleReturnLocker = () => {
    if (!clickedLockerId) {
      toast.error('사물함을 선택해주세요');
      return;
    }
    returnLocker(clickedLockerId);
  };
  return { handleReturnLocker };
};
