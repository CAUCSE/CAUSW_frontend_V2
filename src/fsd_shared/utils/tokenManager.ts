'use client';
import { BASEURL, removeRccAccess, removeRccRefresh, removeRscAccess, removeRscRefresh, setRccToken, setRscToken } from "@/fsd_shared/configs";

export const tokenManager = () => {


  const URI = BASEURL + '/api/v1/users';

  const signoutAndRedirect = () => {
    removeAllTokens();
    location.href = '/auth/signin';
  };

  const removeAllTokens = () => {
    removeRccRefresh();
    removeRccAccess();
    removeRscRefresh();
    removeRscAccess();
  };

  const updateAccess = async (refresh: string) => {
    try {
      const response = (await fetch(`${URI}/token/update`, {
        body: JSON.stringify({ refreshToken: refresh ?? '' }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      }).then((res) => res.json())) as User.UpdateAccessTokenRequestDto;

      if (response.errorCode) return null;

      await setRscToken(response.accessToken, refresh);
      setRccToken(response.accessToken, refresh);

      return response.accessToken;
    } catch (error) {
      return null;
    }
  };

  return { updateAccess, signoutAndRedirect };
}