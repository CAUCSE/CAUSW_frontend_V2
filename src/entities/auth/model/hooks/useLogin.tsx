'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import { signin } from '@/entities/auth/api/post';
import { getMyInfo } from '@/entities/user/api/get';

import { parseErrorMessage, setRccToken, setRscToken } from '@/shared';
import { timeStamp } from 'console';
import Cookies from 'js-cookie';

export const useLogin = ({ onDeletedAccount }: { onDeletedAccount?: () => void }) => {
  const router = useRouter();
  let timeStamp = 0;
  return useMutation({
    mutationFn: signin,
    onSuccess: async (data: { accessToken: string; refreshToken: string }, body: User.SignInRequestDto) => {
      const { accessToken, refreshToken } = data;
      const timeStamp = new Date().getTime();
      console.log('setRscToken start', new Date().getTime() - timeStamp);
      Cookies.set("CAUCSE_JWT_ACCESS", accessToken);
      Cookies.set("CAUCSE_JWT_REFRESH", refreshToken);
      console.log('setRscToken end', new Date().getTime() - timeStamp);

      
      console.log('setRccToken start', new Date().getTime() - timeStamp);
      await setRccToken(accessToken, refreshToken);
      console.log('setRccToken end', new Date().getTime() - timeStamp);

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
