"use client";

import { FORMAPI } from "@/shared";
//import { useRouter } from "next/navigation";

export const CircleService = () => {
  const URI = "/api/v1/circles";
  //const router = useRouter();

  const editCircle = async (id: string, body: FormData) => {
    await FORMAPI.put(`${URI}/${id}`, body);

    window.location.reload();
  };

  return { editCircle };
};
