"use client";

import { FORMAPI, API } from "@/shared";
import { AxiosResponse } from "axios";
//import { useRouter } from "next/navigation";

export const CircleService = () => {
  const URI = "/api/v1/circles";
  //const router = useRouter();

  const editCircle = async (id: string, body: FormData) => {
    await FORMAPI.put(`${URI}/${id}`, body);

    window.location.reload();
  };

  const dropMember = async (userId: string, circleId: string) => {
    try {
      const response = (await API.put(
        `${URI}/${circleId}/users/${userId}/drop`,
      )) as AxiosResponse;
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getApplication = async (id: string) => {
    const { data } = (await API.get(
      `/api/v1/circles/${id}/apply/application`,
    )) as AxiosResponse<any>;

    return data;
  };

  const checkApplication = async (id: string) => {
    const { data } = (await API.get(
      `/api/v1/circles/${id}/apply/application/is-exist`,
    )) as AxiosResponse<any>;

    return data;
  };

  return { editCircle, dropMember, getApplication, checkApplication };
};
