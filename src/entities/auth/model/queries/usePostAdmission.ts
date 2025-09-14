'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { parseErrorMessage } from '@/shared';

import { submitAdmissionsApplication } from '../../api/post';

export const usePostAdmission = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: submitAdmissionsApplication,
    onSuccess: () => {
      toast.success('가입 신청서 제출이 완료되었습니다!');
      setTimeout(() => {
        router.push('/auth/authorization');
      }, 500);
    },
    onError: (error: any) => {
      toast.error(parseErrorMessage(error, '가입 신청서 제출 실패: '));
    },
  });
};