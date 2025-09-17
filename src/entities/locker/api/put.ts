'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import { API } from '@/shared';
import { LOCKER_CONSTANT } from '@/shared';

import { useGetLockerLocations } from '../api';
import { lockerQueryKey } from '../config';
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
export const useLockerRegistration = ({ onSuccess }: { onSuccess?: () => void }) => {
  const setClickedLockerStatus = useLockerSelectionStore((state) => state.setClickedLockerStatus);
  const { data } = useGetLockerLocations();
  const { floor } = LOCKER_CONSTANT();

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

      // 성공 시 토스트 띄울 토스트 메시지에 위치 포함시킬 예정
      // const location = data?.myLocker
      //   ? `${floor[data?.myLocker.lockerNumber.split(' ')[0]]} ${data?.myLocker.lockerNumber.split(' ')[1]}번`
      //   : '없음';

      toast.success(`선택하신 사물함이 신청 완료되었습니다.`, {
        duration: 5000,
        style: {
          whiteSpace: 'pre-line',
          textAlign: 'center',
        },
      });

      onSuccess?.();
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
