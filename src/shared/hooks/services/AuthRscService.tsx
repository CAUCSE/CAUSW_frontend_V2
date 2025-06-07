'use client';

import { usePushNotification } from '@/fsd_entities/notification';

import {
  BASEURL,
  removeRccAccess,
  removeRccRefresh,
  removeRscAccess,
  removeRscRefresh,
  setRccToken,
  setRscToken,
} from '@/shared';

export const AuthRscService = () => {
  const URI = BASEURL + '/api/v1/users';
  const { resetFCMToken } = usePushNotification();

  const updateAccess = async (refresh: string) => {
    try {
      const response = (await fetch(`${URI}/token/update`, {
        body: JSON.stringify({ refreshToken: refresh ?? '' }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      }).then((res) => res.json())) as User.UpdateAccessTokenRequestDto;

      if (response.errorCode) throw new Error(response.errorCode);

      await setRscToken(response.accessToken, refresh);
      setRccToken(response.accessToken, refresh);

      return response.accessToken;
    } catch (error) {
      signout();
    }
  };

  const signout = async () => {
    //TODO: API 추가 필요
    removeRccAccess();
    removeRccRefresh();
    resetFCMToken();
    await removeRscAccess();
    await removeRscRefresh();
  };

  return { updateAccess, signout };
};
