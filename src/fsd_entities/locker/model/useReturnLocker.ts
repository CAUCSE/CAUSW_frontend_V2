'use client';

import toast from 'react-hot-toast';

import { useReleaseLocker } from '../api';
import { useLockerSelectionStore } from './useLockerSelectionStore';

export const useReturnLocker = () => {
  const clickedLockerId = useLockerSelectionStore((state) => state.clickedLockerId);

  const { mutate: returnLocker } = useReleaseLocker();
  const handleReturnLocker = () => {
    if (!clickedLockerId) {
      toast.error('사물함을 선택해주세요');
      return;
    }
    returnLocker(clickedLockerId);
  };
  return { handleReturnLocker };
};
