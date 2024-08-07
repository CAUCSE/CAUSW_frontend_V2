import { BASEURL, setRscHeader } from "@/shared";

export const CircleRscService = () => {
  const URI = BASEURL + "/api/v1/circles";

  const getCirclesPage = async () => {
    try {
      const headers = await setRscHeader();
      const response = (await fetch(URI, { headers: headers }).then((res) =>
        res.json()
      )) as Circle.CirclesRequestDto;

      if (response.errorCode) throw new Error(response.errorCode);

      return response;
    } catch (error) {
      console.error(error);

      throw error;
    }
  };

  return { getCirclesPage };
};
