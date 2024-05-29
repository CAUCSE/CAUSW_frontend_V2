import { AxiosResponse } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import { API } from "@/shared";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const response = (await API.post(
        `/api/v1/users/sign-in`,
        req.body
      )) as AxiosResponse<{
        accessToken: string;
        refreshToken: string;
      }>;
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error fetching data from external API:", error);
      res
        .status(500)
        .json({ message: "Failed to fetch data from external API" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
