"use client";

import {
  BASEURL,
  useUserStore,
  useLayoutStore,
  API,
  setAccess,
  storeRefresh,
  setRscHeader,
  getRscRefresh,
  setRscAccess,
  removeRscAccess,
  storeRscRefresh,
  removeRscRefresh,
  removeAccess,
  removeRefresh,
} from "@/shared";

export const AuthRscService = () => {
  const URI = BASEURL + "/api/v1/users";

  const updateAccess = async () => {
    try {
      const refresh = await getRscRefresh();

      const response = (await fetch(`${URI}/token/update`, {
        body: JSON.stringify({ refreshToken: refresh ?? "" }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      }).then((res) => res.json())) as User.UpdateAccessTokenRequestDto;

      if (response.errorCode) throw new Error(response.errorCode);

      setAccess(response.accessToken);
      setRscAccess(response.accessToken);

      return response.accessToken;
    } catch (error) {
      console.error(error);

      throw error;
    }
  };

  return { updateAccess };
};
