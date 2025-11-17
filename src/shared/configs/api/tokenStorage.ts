import Cookies from 'js-cookie';

import { isNativeApp, secureStorage } from '@/shared';

const STORAGE_REFRESH_KEY = 'CAUCSE_JWT_REFRESH';
const STORAGE_ACCESS_KEY = 'CAUCSE_JWT_ACCESS';

export interface TokenStorage {
  setTokens: (access: string, refresh: string | false) => Promise<void>;
  removeAccess: () => void;
  getAccess: () => string;
  removeRefresh: () => Promise<void>;
  getRefresh: () => Promise<string | null>;
}

export const createTokenStorage = (
  apiInstances: { defaults: { headers: Record<string, unknown> } }[],
): TokenStorage => {
  const setTokens = async (access: string, refresh: string | false) => {
    // 모든 axios 인스턴스에 토큰 설정
    apiInstances.forEach((instance) => {
      instance.defaults.headers['Authorization'] = `Bearer ${access}`;
    });

    if (refresh) {
      Cookies.set(STORAGE_ACCESS_KEY, access);
      Cookies.set(STORAGE_REFRESH_KEY, refresh);
      await secureStorage.set(STORAGE_REFRESH_KEY, refresh);
    }
  };

  const removeAccess = () => {
    apiInstances.forEach((instance) => {
      delete instance.defaults.headers['Authorization'];
    });
  };

  const getAccess = (): string => {
    const authHeader = apiInstances[0]?.defaults.headers['Authorization'] as
      | string
      | undefined;
    return authHeader?.split(' ')[1] || '';
  };

  const removeRefresh = async (): Promise<void> => {
    if (isNativeApp()) {
      await secureStorage.remove(STORAGE_REFRESH_KEY);
    } else {
      Cookies.remove(STORAGE_REFRESH_KEY);
    }
  };

  const getRefresh = async (): Promise<string | null> => {
    if (isNativeApp()) {
      return await secureStorage.get(STORAGE_REFRESH_KEY);
    }
    return Cookies.get(STORAGE_REFRESH_KEY) || null;
  };

  return {
    setTokens,
    removeAccess,
    getAccess,
    removeRefresh,
    getRefresh,
  };
};
