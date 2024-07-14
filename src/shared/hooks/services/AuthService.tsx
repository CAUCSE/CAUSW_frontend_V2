"use client";

import { AxiosResponse } from "axios";

import { useUserStore, API, setAccess, storeRefresh } from "@/shared";

export const AuthService = () => {
  const URI = "/api/v1/users";

  const setUserStore = useUserStore(
    (state: User.UseUserStore) => state.setUserStore
  );

  const signin = async (body: User.SignInRequestDto) => {
    const {
      data: { accessToken, refreshToken },
    } = (await API.post(`${URI}/sign-in`, body)) as AxiosResponse<{
      accessToken: string;
      refreshToken: string;
    }>;

    setAccess(accessToken);
    storeRefresh(body.auto ?? false, refreshToken);
  };

  return { signin };
};
