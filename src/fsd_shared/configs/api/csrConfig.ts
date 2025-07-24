import axios, { AxiosError } from 'axios';

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
    } = error;
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
      const refresh = getRccRefresh();
      if (!refresh) {
        location.href = '/auth/signin';
      } else {
        const accessToken = await updateAccess(refresh);
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance.request(config);
      }
    } else if (noPermissionCode.includes(error.message)) location.href = '/no-permission';
    else if (noRefreshTokenCode.includes(error.message)) {
      signoutAndRedirect();
    }
  }

  throw new Error(`${error}`);
};

API.interceptors.response.use(
  (response) => response,
  (error) => handleError(error, API),
);

FORMAPI.interceptors.response.use(
  (response) => response,
  (error) => handleError(error, FORMAPI),
);

