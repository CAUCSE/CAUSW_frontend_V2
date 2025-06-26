'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import { lockerQueryKey } from '@/fsd_shared';
import { API } from '@/shared';

import { useLockerSelectionStore } from '../model';

export const useLockerExtenstion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (lockerId: string) => {
      await API.put(`/api/v1/lockers/${lockerId}`, {
        action: 'EXTEND',
        message: '사물함 연장',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lockerQueryKey.all });
      toast.success('사물함 연장이 완료되었습니다.');
    },
    onError: () => {
      toast.error('사물함 연장에 실패했습니다.');
    },
  });
};
export const useLockerRegistration = () => {
  const setClickedLockerStatus = useLockerSelectionStore((state) => state.setClickedLockerStatus);

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (lockerId: string) => {
      await API.put(`/api/v1/lockers/${lockerId}`, {
        action: 'REGISTER',
        message: '사물함 등록',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lockerQueryKey.all });
      setClickedLockerStatus('isMine');
      toast.success('사물함 등록이 완료되었습니다.');
    },
    onError: () => {
      toast.error('사물함 등록에 실패했습니다.');
    },
  });
};
export const useReleaseLocker = () => {
  const { setClickedLockerId, setClickedLockerStatus } = useLockerSelectionStore(
    useShallow((state) => ({
      setClickedLockerId: state.setClickedLockerId,
      setClickedLockerStatus: state.setClickedLockerStatus,
    })),
  );

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (lockerId: string) => {
      await API.put(`/api/v1/lockers/${lockerId}`, {
        action: 'RETURN',
        message: '사물함 반납',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lockerQueryKey.all });
      setClickedLockerId(null);
      setClickedLockerStatus(null);
      toast.success('사물함 반납이 완료되었습니다.');
    },
    onError: () => {
      toast.error('사물함 반납에 실패했습니다.');
    },
  });
};
