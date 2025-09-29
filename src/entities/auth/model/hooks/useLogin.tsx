'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

import { signin } from '@/entities/auth/api/post';
import { getMyInfo } from '@/entities/user/api/get';

import { parseErrorMessage, setRccToken } from '@/shared';
import Cookies from 'js-cookie';

export const useLogin = ({ onDeletedAccount }: { onDeletedAccount?: () => void }) => {
  const router = useRouter();
  return useMutation({
    mutationFn: signin,
    onSuccess: async (data: { accessToken: string; refreshToken: string }, body: User.SignInRequestDto) => {
      const { accessToken, refreshToken } = data;

      Cookies.set("CAUCSE_JWT_ACCESS", accessToken);
      Cookies.set("CAUCSE_JWT_REFRESH", refreshToken);


      await setRccToken(accessToken, refreshToken);

      const response = await getMyInfo();

      if (response.state === 'AWAIT') {
        await router.push('/auth/authorization');
      } else {
        if (response.academicStatus == 'UNDETERMINED') {
          await router.push('/auth/authorization');
        } else {
          await router.push('/home');
        }
      }

      toast.success('로그인 성공!');
    },
    onError: (error: Error.ApiErrorResponse) => {
      if (axios.isAxiosError(error) && error.response?.data?.errorCode === 4103) {
        onDeletedAccount?.();
        return;
      }
      toast.error(parseErrorMessage(error, '로그인 정보가 일치하지 않습니다!'));
    },
  });
};
