'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { parseErrorMessage } from '@/fsd_shared';

import { signup } from '../../api/post';

export const usePostSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success('회원가입이 완료되었습니다!');
      setTimeout(() => {
        router.push('/auth/signin');
      }, 500);
    },
    onError: (error: Error.ApiErrorResponse) => {
      toast.error(parseErrorMessage(error, '회원가입 중 오류가 발생했습니다.'));
    },
  });
};