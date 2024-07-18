import axios, { AxiosResponse } from "axios";

import {
  BASEURL,
  noAccessTokenCode,
  noPermissionCode,
  noRefreshTokenCode,
  AuthRscService,
} from "@/shared";

export const API = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

//Auth
export const setAccess = (token: string): unknown =>
  (API.defaults.headers["Authorization"] = token);
export const removeAccess = (): unknown =>
  delete API.defaults.headers["Authorization"];
export const getAccess = (): string =>
  `${API.defaults.headers["Authorization"]}`;

//Refresh
const storageRefreshKey = "CAUCSE_JWT_REFRESH";
let isStored: boolean = true;

export const storeRefresh = (auto: boolean, token: string): void => {
  isStored = auto;

  if (isStored) localStorage.setItem(storageRefreshKey, token);
  else sessionStorage.setItem(storageRefreshKey, token);
};
export const removeRefresh = (): void => {
  localStorage.removeItem(storageRefreshKey);
  sessionStorage.removeItem(storageRefreshKey);
};
export const getRefresh = (): string | null => {
  return (
    localStorage.getItem(storageRefreshKey) ??
    sessionStorage.getItem(storageRefreshKey)
  );
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { updateAccess, signout } = AuthRscService();
    if (error.response) {
      const {
        response: {
          data: { errorCode },
        },
        config,
      } = error;

      //Access token 재발급 과정
      if (noAccessTokenCode.includes(errorCode)) {
        const accessToken = await updateAccess();
        config.headers["Authorization"] = accessToken;
        return API.request(config);
      } else if (noPermissionCode.includes(error.message))
        location.href = "/no-permission";
      else if (noRefreshTokenCode.includes(error.message)) {
        signout();
        location.href = "auth/signin";
      }
    }
    throw new Error(`${error}`);
  }
);
