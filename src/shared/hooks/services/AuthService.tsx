'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import { getMyInfo } from '@/fsd_entities/user/api/get';

import { API, BASEURL, setRccToken, setRscToken, useFindAccountStore, useLayoutStore, useUserStore } from '@/shared';

export const AuthService = () => {
  const URI = '/api/v1/users';
  const router = useRouter();
  const setUserStore = useUserStore((state) => state.setUserStore);
  const setErrorMessage = useLayoutStore((state) => state.setErrorMessage);
  const state = useUserStore((state) => state.state);

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

  const signup = async (selectedData: User.SignUpFormPost) => {
    try {
      // axios POST 요청
      const response = await axios.post(`${BASEURL}${URI}/sign-up`, selectedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data; // 서버에서 받은 데이터를 리턴
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios 에러 처리
        const errorMessage = error.response?.data?.message;
        throw new Error(errorMessage); // 에러 메시지를 던져서 onSubmit에서 처리할 수 있게 함
      } else {
        throw new Error('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  const checkEmailDuplicate = async (email: string): Promise<boolean> => {
    try {
      const response = (await API.get(`${URI}/${email}/is-duplicated`, {
        params: { email },
      })) as AxiosResponse<any>; // 타입 변경
      return response.data.result; // 서버에서 받은 데이터를 리턴
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || '이메일 중복검사에 실패했습니다.');
      } else {
        throw new Error('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  const checkNicknameDuplicate = async (nickname: string): Promise<boolean> => {
    try {
      const response = (await API.get(`${URI}/${nickname}/is-duplicated-nickname`, {
        params: { nickname },
      })) as AxiosResponse<any>; // 타입 변경

      return response.data.result; // 서버에서 받은 데이터를 리턴
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || '닉네임 중복검사에 실패했습니다.');
      } else {
        throw new Error('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  const checkStudentIdDuplicate = async (studentId: string): Promise<boolean> => {
    try {
      const response = (await API.get(`${URI}/${studentId}/is-duplicated-student-id`, {
        params: { studentId },
      })) as AxiosResponse<any>; // 타입 변경
      return response.data.result; // 서버에서 받은 데이터를 리턴
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || '학번 중복검사에 실패했습니다.');
      } else {
        throw new Error('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  const useFindId = () => {
    const { setEmail, resetFindAccountStore } = useFindAccountStore(
      useShallow((state) => ({
        setEmail: state.setEmail,
        resetFindAccountStore: state.resetFindAccountStore,
      })),
    );
    return useMutation({
      mutationFn: async ({ studentId, name }: { studentId: string; name: string }) => {
        const { data }: { data: { email: string } } = await API.post(`/api/v1/users/user-id/find`, {
          studentId,
          name,
        });
        return data.email;
      },
      onSuccess: (data) => {
        setEmail(data);
      },
      onError: () => {
        toast.error('사용자를 찾을 수 없습니다.');
        resetFindAccountStore();
      },
    });
  };

  const useFindPassword = () => {
    return useMutation({
      mutationFn: async ({ name, studentId, email }: { name: string; studentId: string; email: string }) => {
        await API.put('/api/v1/users/password/find', {
          name,
          studentId,
          email,
        });
      },
      onMutate: () => {
        toast.loading('비밀번호 찾는 중...');
      },
      onSuccess: () => {
        toast.success('비밀번호 재설정 이메일이 전송되었습니다.');
      },
      onError: () => {
        toast.error('사용자를 찾을 수 없습니다.');
      },
    });
  };
  return {
    signin,
    signup,
    checkEmailDuplicate,
    checkNicknameDuplicate,
    checkStudentIdDuplicate,
    useFindId,
    useFindPassword,
  };
};
