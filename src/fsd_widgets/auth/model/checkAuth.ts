'use client';

import { getMyInfo } from '@/entities/user';

import { getRccRefresh } from '@/shared';

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
