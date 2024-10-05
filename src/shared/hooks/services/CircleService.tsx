"use client";

import { FORMAPI, API } from "@/shared";
import { AxiosResponse } from "axios";
//import { useRouter } from "next/navigation";

export const CircleService = () => {
  const URI = "/api/v1/circles";
  //const router = useRouter();

  const editCircle = async (id: string, body: FormData) => {
    await FORMAPI.put(`${URI}/${id}`, body);

    window.location.href = "/circle/" + id;
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

  return { editCircle, dropMember };
};
