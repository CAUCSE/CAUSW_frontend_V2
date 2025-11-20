/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

import {
  captureSentry,
  extractRequestInfo,
  noAccessTokenCode,
  noPermissionCode,
  noRefreshTokenCode,
  tokenManager,
} from '@/shared';

import { createTokenRefreshQueue } from './tokenRefreshQueue';
import { createTokenStorage } from './tokenStorage';
import { BASEURL } from './url';

// Axios 인스턴스 생성
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

// 토큰 저장소 및 갱신 큐 초기화
const tokenStorage = createTokenStorage([API, FORMAPI]);
const refreshQueue = createTokenRefreshQueue();

// 토큰 관련 함수 export
export const setRccToken = tokenStorage.setTokens;
export const removeRccAccess = tokenStorage.removeAccess;
export const getRccAccess = tokenStorage.getAccess;
export const removeRccRefresh = tokenStorage.removeRefresh;
export const getRccRefresh = tokenStorage.getRefresh;

// 에러 핸들러
const handleError = async (error: any, axiosInstance: AxiosInstance) => {
  const { signoutAndRedirect } = tokenManager();

  const { url, method } = extractRequestInfo(error);

  if (error.response) {
    const {
      response: {
        status,
        data: { errorCode },
      },
      config,
    } = error;

    // Access token 재발급 과정
    if (noAccessTokenCode.includes(errorCode)) {
      const refresh = await getRccRefresh();
      if (!refresh) {
        location.href = '/auth/signin';
      } else {
        const { updateAccess } = tokenManager();
        return refreshQueue.refresh(
          config,
          axiosInstance,
          refresh,
          updateAccess,
          signoutAndRedirect,
        );
      }
    } else if (noPermissionCode.includes(errorCode)) {
      signoutAndRedirect();
    } else if (noRefreshTokenCode.includes(errorCode)) {
      signoutAndRedirect();
    } else if (status >= 500) {
      captureSentry(
        error,
        'server_error',
        { info: '서버 내부 오류 발생', status, url, method },
        'fatal',
      );
    } else {
      captureSentry(
        error,
        'unexpected_error',
        { info: '예상치 못한 오류 발생', errorCode, url, method },
        'warning',
      );
    }
  } else {
    captureSentry(
      error,
      'network_error',
      { info: '서버 응답이 없습니다.', url, method },
      'error',
    );
  }
  throw error;
};

// Interceptor 설정
API.interceptors.response.use(
  (response) => response,
  (error) => handleError(error, API),
);

FORMAPI.interceptors.response.use(
  (response) => response,
  (error) => handleError(error, FORMAPI),
);
