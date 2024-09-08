"use client";

import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

import {
  useUserStore,
  useLayoutStore,
  API,
  setRccToken,
  setRscToken,
  removeRscAccess,
  removeRscRefresh,
  removeRccAccess,
  removeRccRefresh,
} from "@/shared";
import { ErrorMessage } from "@/entities";

export const AuthService = () => {
  const URI = "/api/v1/users";

  const router = useRouter();
  const setUserStore = useUserStore((state) => state.setUserStore);
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

      setRccToken(accessToken, body.auto ? refreshToken : false);

      router.push("/home");
    } catch {
      setErrorMessage("로그인 정보가 일치하지 않습니다!");
    }
  };


  const signup = async (data: User.IAuthForm) => {
    try {
      const {
        email,
        name,
        password,
        studentId,
        admissionYear,
        files,
        nickname,
        major,
        academicStatus,
        currentCompletedSemester,
        graduationYear,
        graduationMonth,
        phoneNumberHyphen,
      } = data;
  
      // files 배열에서 파일 이름만 추출하여 attachImages 배열에 저장
      const attachImages: string[] = files? Array.from(files).map((file) => file.name) : [];
      const phoneNumber = phoneNumberHyphen.replace(/-/g, '');

      const selectedData = {
        email,
        name,
        password,
        studentId: Number(studentId),
        admissionYear: Number(admissionYear),
        attachImages,
        profileImage: null,
        nickname,
        major,
        academicStatus,
        currentCompletedSemester: (academicStatus === "LEAVE_OF_ABSENCE") || (academicStatus === "ENROLLED") ? Number(currentCompletedSemester): null,
        graduationYear: academicStatus === "GRADUATED" ? Number(graduationYear) : null,
        graduationMonth: academicStatus === "GRADUATED" ? Number(graduationMonth) : null,
        phoneNumber,
      };
      console.log(attachImages);
      console.log(selectedData);

      // axios POST 요청
      const response = await axios.post(`https://13.209.181.162.nip.io:8081/api/v1/users/sign-up`, selectedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return response.data; // 서버에서 받은 데이터를 리턴
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios 에러 처리
        const errorMessage = error.response?.data?.message;
        throw new Error(errorMessage);  // 에러 메시지를 던져서 onSubmit에서 처리할 수 있게 함

      } else {
        console.error('General error:', error);
        throw new Error('알 수 없는 오류가 발생했습니다.');
      }
    }
  };


  const checkEmailDuplicate = async (email: string): Promise<boolean> => {
    try {      
      const response = (await API.get(`${URI}/${email}/is-duplicated`, {
        params: { email }
      })) as AxiosResponse<any>;  // 타입 변경
      console.log(response);
      return response.data.result;  // 서버에서 받은 데이터를 리턴
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data?.message || 'Unknown error');
        throw new Error(error.response?.data?.message || 'Failed to check email duplication');
      } else {
        console.error('General error:', error);
        throw new Error('An unexpected error occurred');
      }
    }
  }

  const checkNicknameDuplicate = async (nickname: string): Promise<boolean> => {
    try {      
      const response = (await API.get(`${URI}/${nickname}/is-duplicated-nickname`, {
        params: { nickname }
      })) as AxiosResponse<any>;  // 타입 변경

      return response.data.result;  // 서버에서 받은 데이터를 리턴
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data?.message || 'Unknown error');
        throw new Error(error.response?.data?.message || 'Failed to check email duplication');
      } else {
        console.error('General error:', error);
        throw new Error('An unexpected error occurred');
      }
    }
  }

  return { signin, signup, checkEmailDuplicate, checkNicknameDuplicate };
};
