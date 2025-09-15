'use client';

import toast from 'react-hot-toast';

import { useLockerExtenstion } from '../api';
import { useLockerSelectionStore } from './useLockerSelectionStore';

export const useExtendLocker = () => {
  const clickedLockerId = useLockerSelectionStore((state) => state.clickedLockerId);

  const { mutate: extendLocker } = useLockerExtenstion();

  const handleExtendLocker = () => {
    if (!clickedLockerId) {
      toast.error('사물함을 선택해주세요');
      return;
    }
    extendLocker(clickedLockerId);
  };

  return { handleExtendLocker };
};
