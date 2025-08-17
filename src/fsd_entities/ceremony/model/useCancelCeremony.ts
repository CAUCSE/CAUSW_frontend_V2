'use client';

import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

import { cancelCeremonyRegist } from '../api';
import { generalCeremonyQueryKey } from '../config';

export const useCancelCeremony = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async ({ ceremonyId }: { ceremonyId: string }) => {
      await cancelCeremonyRegist({
        ceremonyId,
      });
    },
    onMutate: () => {
      return toast.loading('로딩 중...');
    },
    onSuccess: (data, variables, context) => {
      toast.dismiss(context);
      const { ceremonyId } = variables;
      queryClient.invalidateQueries({ queryKey: generalCeremonyQueryKey.cancel(ceremonyId) });
      toast.success('신청 취소 성공');
      router.push('/ceremony/list');
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message ?? `경조사 신청 취소를 실패했습니다.`);
        return;
      }
      toast.error('경조사 신청 취소 처리 중 에러가 발생했습니다.');
    },
  });
};
