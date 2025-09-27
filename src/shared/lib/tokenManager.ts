'use client';

import { signout } from '@/entities/auth';
import { getLocalFCMToken, resetFCMToken } from '@/entities/notification/model/usePushNotification';

import {
  BASEURL,
  getRccAccess,
  getRccRefresh,
  removeRccAccess,
  removeRccRefresh,
  removeRscAccess,
  removeRscRefresh,
  setRccToken,
} from '@/shared/configs';

import { STORAGE_KEYS } from '@/shared/configs';
import Cookies from 'js-cookie';

export const tokenManager = () => {
  const FCM_TOKEN_KEY = STORAGE_KEYS.FCM_TOKEN;

  const URI = BASEURL + '/api/v1/users';

  const signoutAndRedirect = () => {
    removeAllTokens();
    location.href = '/auth/signin';
  };

  const removeAllTokens = async () => {
    const accessToken = getRccAccess();
    const refreshToken = await getRccRefresh();
    const fcmToken = getLocalFCMToken();
    Promise.all([
      signout({ accessToken: accessToken || '', refreshToken: refreshToken || '', fcmToken: fcmToken || '' }),
      removeRccRefresh(),
      removeRccAccess(),
      removeRscRefresh(),
      removeRscAccess(),
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

      Cookies.set("CAUCSE_JWT_ACCESS", response.accessToken);
      Cookies.set("CAUCSE_JWT_REFRESH", refresh);
      setRccToken(response.accessToken, refresh);

      return response.accessToken;
    } catch (error) {
      await signoutAndRedirect();
    }
  };

  return { updateAccess, signoutAndRedirect };
};
