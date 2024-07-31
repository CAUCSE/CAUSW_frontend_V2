"use client";

import {
  BASEURL,
  useUserStore,
  useLayoutStore,
  API,
  setAccess,
  storeRefresh,
  setRscToken,
  setRscHeader,
  getRscRefresh,
  removeRscAccess,
  removeRscRefresh,
  removeAccess,
  removeRefresh,
} from "@/shared";

export const AuthRscService = () => {
  const URI = BASEURL + "/api/v1/users";

  const updateAccess = async (refresh: string) => {
    try {
      const response = (await fetch(`${URI}/token/update`, {
        body: JSON.stringify({ refreshToken: refresh ?? "" }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      }).then((res) => res.json())) as User.UpdateAccessTokenRequestDto;

      if (response.errorCode) throw new Error(response.errorCode);

      await setRscToken(response.accessToken, refresh);
      setAccess(response.accessToken);

      return response.accessToken;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const signout = async () => {
    //TODO: API 추가 필요
    removeAccess();
    removeRefresh();
    removeRscAccess();
    removeRscRefresh();
  };

  return { updateAccess, signout };
};
