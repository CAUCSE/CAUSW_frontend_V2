import axios, { AxiosResponse } from "axios";

import { API } from "@/shared/configs/axios";

export const HomeRscService = () => {
  const URI = "/api/v1/home";

  const getHomePage = async () => {
    const response = (await API.get(
      URI
    )) as AxiosResponse<Home.GetHomePageResponseDto>;

    return response.data;
  };

  return { getHomePage };
};
