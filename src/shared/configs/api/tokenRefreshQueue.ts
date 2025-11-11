/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

export interface TokenRefreshQueue {
  refresh: (
    config: any,
    axiosInstance: AxiosInstance,
    refreshToken: string,
    updateAccess: (refreshToken: string) => Promise<string>,
    onError: () => void,
  ) => Promise<any>;
}

export const createTokenRefreshQueue = (): TokenRefreshQueue => {
  const queue: RetryQueueItem[] = [];
  let isRefreshing = false;

  const refresh = async (
    config: any,
    axiosInstance: AxiosInstance,
    refreshToken: string,
    updateAccess: (refreshToken: string) => Promise<string>,
    onError: () => void,
  ) => {
    // 모든 요청을 큐에 추가
    const promise = new Promise((resolve, reject) => {
      queue.push({ config, resolve, reject });
    });

    // 현재 refresh 중이 아니면 refresh 시작
    if (!isRefreshing) {
      isRefreshing = true;

      (async () => {
        try {
          const accessToken = await updateAccess(refreshToken);

          // 대기 중인 모든 요청 재시도
          queue.forEach(({ config, resolve, reject }) => {
            if (!config.headers) {
              config.headers = {};
            }
            config.headers['Authorization'] = `Bearer ${accessToken}`;

            // 새로운 axios 인스턴스 생성 (interceptor가 없는 인스턴스)
            const newAxiosInstance = axios.create({
              baseURL: axiosInstance.defaults.baseURL,
              headers: axiosInstance.defaults.headers,
              paramsSerializer: axiosInstance.defaults.paramsSerializer,
            });

            newAxiosInstance
              .request(config)
              .then((response) => resolve(response))
              .catch((err) => {
                onError();
                reject(err);
              });
          });

          queue.length = 0;
        } catch (err) {
          // refresh 실패 시 모든 대기 요청 reject
          queue.forEach(({ reject }) => reject(err));
          queue.length = 0;
          onError();
        } finally {
          isRefreshing = false;
        }
      })();
    }

    return promise;
  };

  return { refresh };
};
