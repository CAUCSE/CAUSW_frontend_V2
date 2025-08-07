import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { noAccessTokenCode, noPermissionCode, noRefreshTokenCode } from '@/fsd_shared';

import { BASEURL } from './url';
import { tokenManager } from '@/fsd_shared';

export const API = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const FORMAPI = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'multipart/form-data',
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

export const setRccToken = (access: string, refresh: string | false) => {
  API.defaults.headers['Authorization'] = `Bearer ${access}`;
  FORMAPI.defaults.headers['Authorization'] = `Bearer ${access}`;
  if (refresh) localStorage.setItem(storageRefreshKey, refresh);
};

export const removeRccAccess = () => {
  delete API.defaults.headers['Authorization'];
  delete FORMAPI.defaults.headers['Authorization'];
};

export const getRccAccess = (): string => `${API.defaults.headers['Authorization']}`;

export const removeRccRefresh = (): void => {
  localStorage.removeItem(storageRefreshKey);
};

export const getRccRefresh = (): string | null => {
  return localStorage.getItem(storageRefreshKey);
};

const handleError = async (error: any, axiosInstance: typeof API | typeof FORMAPI) => {
  const { updateAccess, signoutAndRedirect } = tokenManager();

  if (error.response) {
    const {
      response: {
        data: { errorCode },
      },
      config,
    } = error;

    //Access token 재발급 과정
    if (noAccessTokenCode.includes(errorCode)) {
      const refresh = getRccRefresh();
      if (!refresh) {
        location.href = '/auth/signin';
      } else {
        return refreshTokenWithQueue(config, axiosInstance, refresh);
      }
    } 
    else if (noPermissionCode.includes(errorCode)) signoutAndRedirect();
    else if (noRefreshTokenCode.includes(errorCode)) signoutAndRedirect();
  }
  throw error;
};

const refreshTokenWithQueue = async (config: any, axiosInstance: typeof API | typeof FORMAPI, refreshToken: string) => {
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
    }
    catch (err) {
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