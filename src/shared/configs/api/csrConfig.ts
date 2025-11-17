/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import qs from 'qs';

import {
  allErrorCode,
  captureSentry,
  isNativeApp,
  noAccessTokenCode,
  noPermissionCode,
  noRefreshTokenCode,
  secureStorage,
  tokenManager,
} from '@/shared';

import { BASEURL } from './url';

export const API = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
});

export const FORMAPI = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
});

// 토큰 재발급 대기열
interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

const refreshAndRetryQueue: RetryQueueItem[] = [];
let isRefreshing = false;

const storageRefreshKey = 'CAUCSE_JWT_REFRESH';
const storageAccessKey = 'CAUCSE_JWT_ACCESS';

export const setRccToken = async (access: string, refresh: string | false) => {
  API.defaults.headers['Authorization'] = `Bearer ${access}`;
  FORMAPI.defaults.headers['Authorization'] = `Bearer ${access}`;

  if (refresh) {
    Cookies.set(storageAccessKey, access);
    Cookies.set(storageRefreshKey, refresh);
    await secureStorage.set(storageRefreshKey, refresh);
  }
};

export const removeRccAccess = () => {
  delete API.defaults.headers['Authorization'];
  delete FORMAPI.defaults.headers['Authorization'];
};

export const getRccAccess = (): string =>
  (API.defaults.headers['Authorization'] as string)?.split(' ')[1] || '';

export const removeRccRefresh = async (): Promise<void> => {
  if (isNativeApp()) {
    await secureStorage.remove(storageRefreshKey);
  } else {
    Cookies.remove(storageRefreshKey);
  }
};

export const getRccRefresh = async (): Promise<string | null> => {
  if (isNativeApp()) {
    return await secureStorage.get(storageRefreshKey);
  }
  return Cookies.get(storageRefreshKey) || null;
};

const handleError = async (
  error: any,
  axiosInstance: typeof API | typeof FORMAPI,
) => {
  const { signoutAndRedirect } = tokenManager();

  const status = error?.response?.status;
  const errorCode = error?.response?.data?.errorCode;
  const url = error?.config?.url || 'unknown';
  const method = error?.config?.method?.toUpperCase() || 'UNKNOWN';

  // Sentry 전송 필터링
  if (!error.response) {
    captureSentry(
      error,
      'network_error',
      { info: '서버 응답이 없습니다.', url, method },
      'error',
    );
  } else if (status >= 500) {
    captureSentry(
      error,
      'server_error',
      { info: '서버 내부 오류 발생', status, url, method },
      'fatal',
    );
  } else if (
    !allErrorCode.includes(errorCode) &&
    (status < 400 || status >= 500)
  ) {
    captureSentry(
      error,
      'unexpected_error',
      { info: '예상치 못한 오류 발생', errorCode, url, method },
      'warning',
    );
  }

  if (error.response) {
    const {
      response: {
        data: { errorCode },
      },
      config,
    } = error;

    //Access token 재발급 과정
    if (noAccessTokenCode.includes(errorCode)) {
      const refresh = await getRccRefresh();
      if (!refresh) {
        location.href = '/auth/signin';
      } else {
        return refreshTokenWithQueue(config, axiosInstance, refresh);
      }
    } else if (noPermissionCode.includes(errorCode)) signoutAndRedirect();
    else if (noRefreshTokenCode.includes(errorCode)) signoutAndRedirect();
  }
  throw error;
};

const refreshTokenWithQueue = async (
  config: any,
  axiosInstance: typeof API | typeof FORMAPI,
  refreshToken: string,
) => {
  const { updateAccess, signoutAndRedirect } = tokenManager();

  if (!isRefreshing) {
    isRefreshing = true;
    try {
      const accessToken = await updateAccess(refreshToken);
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
        axiosInstance
          .request(config)
          .then((response) => resolve(response))
          .catch((err) => reject(err));
      });
      refreshAndRetryQueue.length = 0;
      return axiosInstance.request(config);
    } catch (err) {
      signoutAndRedirect();
    } finally {
      isRefreshing = false;
    }
  }
  // 토큰 재발급 대기열에 추가
  return new Promise((resolve, reject) => {
    refreshAndRetryQueue.push({ config, resolve, reject });
  });
};

API.interceptors.response.use(
  (response) => response,
  (error) => handleError(error, API),
);

FORMAPI.interceptors.response.use(
  (response) => response,
  (error) => handleError(error, FORMAPI),
);
