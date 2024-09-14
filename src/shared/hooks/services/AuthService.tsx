"use client";

import { AxiosResponse } from "axios";
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

      // accessToken과 refreshToken 처리 (기존 로직)
      await setRscToken(accessToken, body.auto ? refreshToken : false);
      setRccToken(accessToken, body.auto ? refreshToken : false);

      // accessToken을 localStorage에 저장
      localStorage.setItem("accessToken", accessToken);
      if (body.auto && refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      // 로그인 후 홈으로 이동
      router.push("/home");
    } catch (error) {
      setErrorMessage("로그인 정보가 일치하지 않습니다!");
    }
  };

  return { signin };
};
