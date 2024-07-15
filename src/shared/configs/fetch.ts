"use server";

import { cookies } from "next/headers";

//Access
const storageAccessKey = "CAUCSE_JWT_ACCESS";

export const setRscAccess = (token: string) => {
  cookies().set(storageAccessKey, token);
};
export const removeRscAccess = () => {
  cookies().delete(storageAccessKey);
};

export const getRscAccess = async () => {
  const token = cookies().get(storageAccessKey)?.value;
  return Promise.resolve(token);
};

export const setRscHeader = async (): Promise<{
  Authorization: string;
}> => {
  const token = await getRscAccess();

  if (token) {
    return {
      Authorization: token,
    };
  }

  return { Authorization: "" };
};

//Refresh
const storageRefreshKey = "CAUCSE_JWT_REFRESH";

export const storeRscRefresh = (token: string) => {
  cookies().set(storageRefreshKey, token);
};

export const removeRscRefresh = () => {
  cookies().delete(storageRefreshKey);
};

export const getRscRefresh = async () => {
  const token = cookies().get(storageRefreshKey)?.value;
  return Promise.resolve(token);
};
