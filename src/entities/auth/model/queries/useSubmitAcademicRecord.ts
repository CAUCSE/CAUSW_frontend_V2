'use client';

import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { userQueryKey } from '@/entities/user/config/queryKeys/userQueryKey';

import { parseErrorMessage } from '@/shared';

import { postAcademicRecord } from '../../api/post';

interface UseSubmitAcademicRecordProps {
  curAcademicStatus: string;
}

export const useSubmitAcademicRecord = ({ curAcademicStatus }: UseSubmitAcademicRecordProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postAcademicRecord,
    onSuccess: (data, variables) => {
      toast.success('증빙 서류 제출이 완료되었습니다!');
      queryClient.invalidateQueries({ queryKey: userQueryKey.all });

      setTimeout(() => {
        router.push(
          curAcademicStatus === 'UNDEFINED' && variables.targetAcademicStatus !== 'ENROLLED' ? '/auth/signin' : './',
        );
        // UNDEFINED -> 휴학, 졸업일 경우 바로 로그인 가능하므로 로그인 페이지로 보냄
      }, 500);
    },
    onError: (error: Error.ApiErrorResponse) => {
      toast.error(parseErrorMessage(error, '증빙 서류 제출 도중 오류가 발생했습니다.'));
    },
  });
};
