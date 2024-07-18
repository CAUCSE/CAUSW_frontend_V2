import axios, { AxiosResponse } from "axios";

import { setRscHeader } from "@/shared";

export const HomeRscService = () => {
  const URI = "/api/v1/home";

  const getHomePage = async () => {
    try {
      const headers = await setRscHeader();
      const response = (await fetch(
        process.env.NEXT_PUBLIC_PROD_SERVER_URL + URI,
        { headers: headers }
      ).then((res) => res.json())) as Home.GetHomePageResponseDto;

      if (response.errorCode) throw new Error(response.errorCode);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { getHomePage };
};
