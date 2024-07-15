"use client";

import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

import {
  useUserStore,
  useLayoutStore,
  API,
  setAccess,
  storeRefresh,
  getAccess,
  getRefresh,
  setRscAccess,
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

      setAccess(accessToken);
      storeRefresh(body.auto ?? false, refreshToken);
      setRscAccess(accessToken);

      router.push("/home");
    } catch {
      setErrorMessage("로그인 정보가 일치하지 않습니다!");
    }
  };

  return { signin };
};
