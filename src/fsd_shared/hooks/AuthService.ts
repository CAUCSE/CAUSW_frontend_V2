'use client';

import { useRouter } from 'next/navigation';

import { AxiosResponse } from 'axios';

import { getMyInfo } from '@/fsd_entities/user/api';

import { API, setRccToken, setRscToken, useLayoutStore } from '@/shared';

const URI = '/api/v1/users';

export const AuthService = () => {
  const router = useRouter();
  const setErrorMessage = useLayoutStore((state) => state.setErrorMessage);

  const signin = async (body: User.SignInRequestDto) => {
    try {
      const {
        data: { accessToken, refreshToken },
      } = (await API.post(`${URI}/sign-in`, body)) as AxiosResponse<{
        accessToken: string;
        refreshToken: string;
      }>;

      await setRscToken(accessToken, body.auto ? refreshToken : false);
      await setRccToken(accessToken, body.auto ? refreshToken : false);

      const AdmissionResponse = await getMyInfo();

      if (AdmissionResponse.data.state === 'AWAIT') {
        router.push('/auth/authorization');
      } else {
        if (AdmissionResponse.data.academicStatus == 'UNDETERMINED') {
          router.push('/auth/authorization');
        } else {
          router.push('/home');
        }
      }
    } catch (error) {
      setErrorMessage('로그인 정보가 일치하지 않습니다!');
    }
  };
  return { signin };
};
