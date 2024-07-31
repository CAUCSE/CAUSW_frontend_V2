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

      await setRscToken(accessToken, body.auto ? refreshToken : false);

      setRccToken(accessToken, body.auto ? refreshToken : false);

      router.push("/home");
    } catch {
      setErrorMessage("로그인 정보가 일치하지 않습니다!");
    }
  };

  const signout = async () => {
    //TODO: API 추가 필요
    removeRccAccess();
    removeRccRefresh();
    await removeRscAccess();
    await removeRscRefresh();

    router.push("/auth/signin");
  };

  return { signin, signout };
};
