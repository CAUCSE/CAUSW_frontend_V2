'use client';
import { BASEURL, getRccAccess, getRccRefresh, removeRccAccess, removeRccRefresh, removeRscAccess, removeRscRefresh, setRccToken, setRscToken } from "@/fsd_shared/configs";
import { signout } from "@/fsd_entities/auth";
import { STORAGE_KEYS } from "@/fsd_shared/configs";
import { resetFCMToken, getLocalFCMToken } from "@/fsd_entities/notification/model/usePushNotification";

export const tokenManager = () => {
  const FCM_TOKEN_KEY = STORAGE_KEYS.FCM_TOKEN;

  const URI = BASEURL + '/api/v1/users';

  const signoutAndRedirect = () => {
    removeAllTokens();
    location.href = '/auth/signin';
  };

  const removeAllTokens = async () => {
    const accessToken = getRccAccess();
    const refreshToken = getRccRefresh();
    const fcmToken = getLocalFCMToken();
    Promise.all([
      signout({ accessToken: accessToken || '', refreshToken: refreshToken || '', fcmToken: fcmToken || '' }),
      removeRccRefresh(),
      removeRccAccess(),
      removeRscRefresh(),
      removeRscAccess(),
      resetFCMToken(),
    ]);
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

      if (response.errorCode) signoutAndRedirect();

      await setRscToken(response.accessToken, refresh);
      setRccToken(response.accessToken, refresh);

      return response.accessToken;
    } catch (error) {
      await signoutAndRedirect();
    }
  };

  return { updateAccess, signoutAndRedirect };
}