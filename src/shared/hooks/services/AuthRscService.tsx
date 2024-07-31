"use client";

import {
  BASEURL,
  useUserStore,
  useLayoutStore,
  API,
  setRccToken,
  setRscToken,
  setRscHeader,
  getRscRefresh,
  removeRscAccess,
  removeRscRefresh,
  removeRccAccess,
  removeRccRefresh,
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
      setRccToken(response.accessToken, refresh);

      return response.accessToken;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { updateAccess };
};
