'use client';

import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

import { updateAdminCeremonyState } from '../api';
import { generalCeremonyQueryKey } from '../config';

interface useAdminUpdateCeremonyProps {
  setIsModalOpen?: (isOpen: boolean) => void;
}
export const useAdminUpdateCeremony = ({
  setIsModalOpen,
}: useAdminUpdateCeremonyProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async ({
      ceremonyId,
      targetCeremonyState,
    }: {
      ceremonyId: string;
      targetCeremonyState: 'ACCEPT' | 'REJECT' | 'AWAIT' | 'CLOSE';
    }) => {
      await updateAdminCeremonyState({
        ceremonyId,
        targetCeremonyState,
      });
    },
    onMutate: () => {
      return toast.loading('로딩 중...');
    },
    onSuccess: (data, variables, context) => {
      toast.dismiss(context);
      const { ceremonyId, targetCeremonyState } = variables;
      queryClient.invalidateQueries({
        queryKey: generalCeremonyQueryKey.update(ceremonyId),
      });
      if (targetCeremonyState === 'ACCEPT') {
        setIsModalOpen?.(true);
      }
      if (targetCeremonyState === 'REJECT') {
        router.back();
      }
    },
    onError: (error, variables) => {
      const { targetCeremonyState } = variables;

      if (isAxiosError(error)) {
        toast.error(
          error.response?.data.message ??
            `경조사 ${targetCeremonyState === 'ACCEPT' ? '승인' : targetCeremonyState === 'REJECT' ? '거부' : '업데이트'} 실패했습니다.`,
        );
        return;
      }

      toast.error(
        `경조사 ${targetCeremonyState === 'ACCEPT' ? '승인' : targetCeremonyState === 'REJECT' ? '거부' : '업데이트'} 처리 중 에러가 발생했습니다.`,
      );
    },
  });
};
