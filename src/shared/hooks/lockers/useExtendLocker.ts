'use client';

import toast from 'react-hot-toast';

import { LockerService, useLockerSelectionStore } from '@/shared';

export const useExtendLocker = () => {
  const clickedLockerId = useLockerSelectionStore(state => state.clickedLockerId);

  const { useExtendLocker } = LockerService();

  const { mutate: extendLocker } = useExtendLocker();

  const handleExtendLocker = () => {
    if (!clickedLockerId) {
      toast.error('사물함을 선택해주세요');
      return;
    }
    extendLocker(clickedLockerId);
  };

  return { handleExtendLocker };
};
