"use client";

import { AxiosResponse } from "axios";

import { useUserStore, API, setAccess, storeRefresh } from "@/shared";

export const AuthService = () => {
  const URI = "/api/v1/users";

  const setUserStore = useUserStore(
    (state: User.UseUserStore) => state.setUserStore
  );

  const signIn = async (body: User.SignInRequestDto) => {
    const {
      data: { accessToken, refreshToken },
    } = (await API.post(`${URI}/sign-in`, body)) as AxiosResponse<{
      accessToken: string;
      refreshToken: string;
    }>;

    setAccess(accessToken);
    storeRefresh(body.auto ?? false, refreshToken);
  };

  const isDuplicatedEmail = async (email: string): Promise<boolean> => {
    const {
      data: { result },
    } = (await API.get(
      `${URI}/${email}/is-duplicated`
    )) as AxiosResponse<User.IsDuplicatedEmailResponseDto>;

    return result;
  };

  const signUp = async (body: User.CreateDto) => {
    return API.post(`${URI}/sign-up`, body);
  };

  const createAdmission = async (body: FormData): Promise<unknown> => {
    return API.post(`${URI}/admissions/apply`, body);
  };

  const findCurrentUser = async (): Promise<useUserStore> => {
    const { data } = await API.get(`${URI}/me`);
    return setUserStore(data);
  };

  const updatePassword = async (body: User.PasswordUpdateRequestDto) => {
    return API.put(`${URI}/password`, body);
  };

  const findPassword = async (body: User.FindPasswordReqestDto) => {
    return API.put(`${URI}/password/find`, body);
  };

  const signOut = async (body: User.SignOutRequestDto) => {
    return API.post(`${URI}/sign-out`, body);
  };

  return {
    signIn,
    isDuplicatedEmail,
    signUp,
    createAdmission,
    findCurrentUser,
    updatePassword,
    findPassword,
    signOut,
  };
};
