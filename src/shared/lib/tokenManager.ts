'use client';

import { signout } from '@/entities/auth';
import { getLocalFCMToken } from '@/entities/notification/model/usePushNotification';

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


export const tokenManager = () => {

  const URI = BASEURL + '/api/v1/users';

  const signoutAndRedirect = async () => {
    await removeAllTokens();
    location.href = '/auth/signin';
  };

  const removeAllTokens = async () => {
    const accessToken = getRccAccess();
    const refreshToken = await getRccRefresh();
    const fcmToken = await getLocalFCMToken();
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

      setRccToken(response.accessToken, refresh);

      return response.accessToken;
    } catch (error) {
      await signoutAndRedirect();
    }
  };

  return { updateAccess, signoutAndRedirect };
};
