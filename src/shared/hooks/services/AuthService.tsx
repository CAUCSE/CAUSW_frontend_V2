"use client";

import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

import {
  API,
  setRccToken,
  setRscToken,
  useLayoutStore,
  UserService,
  useUserStore,
} from "@/shared";

export const AuthService = () => {
  const URI = "/api/v1/users";
  const { getMyInfo, checkCurrentAcademicStatus } = UserService();

  const router = useRouter();
  const setUserStore = useUserStore((state) => state.setUserStore);
  const setErrorMessage = useLayoutStore((state) => state.setErrorMessage);
  const state = useUserStore((state) => state.state);

  const signin = async (body: User.SignInRequestDto) => {
    try {
      router.push("/loading");

      const {
        data: { accessToken, refreshToken },
      } = (await API.post(`${URI}/sign-in`, body)) as AxiosResponse<{
        accessToken: string;
        refreshToken: string;
      }>;

      await setRscToken(accessToken, body.auto ? refreshToken : false);
      await setRccToken(accessToken, body.auto ? refreshToken : false);

      const AdmissionResponse = await getMyInfo();

      if (AdmissionResponse.data.state === "AWAIT") {
        router.push("/auth/authorization");
      } else {
        if (AdmissionResponse.data.academicStatus == "UNDETERMINED") {
          router.push("/auth/authorization");
        } else {
          router.push("/home");
        }
      }
    } catch (error) {
      setErrorMessage("로그인 정보가 일치하지 않습니다!");
    }
  };

  const signup = async (selectedData: User.SignUpFormPost) => {
    try {
      // axios POST 요청
      const response = await axios.post(
        `https://13.209.181.162.nip.io:8081/api/v1/users/sign-up`,
        selectedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      /*
          const response = await API.post(`${URI}/sign-up`, selectedData, {
          headers: {
            'Content-Type': 'application/json',
        },
      });
   */
      return response.data; // 서버에서 받은 데이터를 리턴
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios 에러 처리
        const errorMessage = error.response?.data?.message;
        throw new Error(errorMessage); // 에러 메시지를 던져서 onSubmit에서 처리할 수 있게 함
      } else {
        console.error("General error:", error);
        throw new Error("알 수 없는 오류가 발생했습니다.");
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
        throw new Error(
          error.response?.data?.message || "이메일 중복검사에 실패했습니다.",
        );
      } else {
        throw new Error("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const checkNicknameDuplicate = async (nickname: string): Promise<boolean> => {
    try {
      const response = (await API.get(
        `${URI}/${nickname}/is-duplicated-nickname`,
        {
          params: { nickname },
        },
      )) as AxiosResponse<any>; // 타입 변경

      return response.data.result; // 서버에서 받은 데이터를 리턴
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "닉네임 중복검사에 실패했습니다.",
        );
      } else {
        throw new Error("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const checkStudentIdDuplicate = async (
    studentId: string,
  ): Promise<boolean> => {
    try {
      const response = (await API.get(
        `${URI}/${studentId}/is-duplicated-student-id`,
        {
          params: { studentId },
        },
      )) as AxiosResponse<any>; // 타입 변경
      return response.data.result; // 서버에서 받은 데이터를 리턴
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "학번 중복검사에 실패했습니다.",
        );
      } else {
        throw new Error("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return {
    signin,
    signup,
    checkEmailDuplicate,
    checkNicknameDuplicate,
    checkStudentIdDuplicate,
  };
};
