import axios, { AxiosResponse } from "axios";

import { setRscHeader } from "@/shared";
import { BASEURL } from "@/utils";

export const HomeRscService = () => {
  const URI = "/api/v1/home";

  const getHomePage = async () => {
    try {
      const headers = await setRscHeader();
      const response = (await fetch(BASEURL + URI, { headers: headers }).then(
        (res) => res.json()
      )) as Home.GetHomePageResponseDto;

      if (response.errorCode) throw new Error(response.errorCode);

      return response;
    } catch (error) {
      console.error(error);

      throw error;
    }
  };

  return { getHomePage };
};
