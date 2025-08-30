'use client';

import { getMyInfo } from '@/fsd_entities/user';

import { getRccRefresh } from '@/fsd_shared';

export const checkAppAuthStatus = async (): Promise<boolean> => {
  try {
    const refreshToken = await getRccRefresh();
    if (refreshToken) {
      await getMyInfo();

      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
};
