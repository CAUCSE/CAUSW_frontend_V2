"use client";

import { AxiosResponse } from "axios";

import {
  useUserStore,
  useLayoutStore,
  API,
  setAccess,
  storeRefresh,
} from "@/shared";

export const AuthService = () => {
  const URI = "/api/v1/users";

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

      setAccess(accessToken);
      storeRefresh(body.auto ?? false, refreshToken);
    } catch {
      setErrorMessage("로그인 정보가 일치하지 않습니다!");
    }
  };

  return { signin };
};
