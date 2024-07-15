"use server";

import { cookies } from "next/headers";

const storageAccessKey = "CAUCSE_JWT_ACCESS";

export const setRscAccess = (token: string) => {
  cookies().set(storageAccessKey, token);
};
export const resetRscAccess = () => {
  cookies().delete(storageAccessKey);
};

/* export const getRscAccess = () => {
  const token = cookies().get(storageAccessKey)?.value;
  return cookies().get(storageAccessKey)?.value;
}; */

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
