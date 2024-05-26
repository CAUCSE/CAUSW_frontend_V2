import axios, { AxiosResponse } from "axios";

export const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.VITE_PROD_SERVER_URL
      : process.env.VITE_PROD_SERVER_URL,
});
//Auth
export const setAccess = (token: string): unknown =>
  (API.defaults.headers["Authorization"] = token);
export const resetAccess = (): unknown =>
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
