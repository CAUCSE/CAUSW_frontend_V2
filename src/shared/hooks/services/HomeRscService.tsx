import { BASEURL, setRscHeader } from "@/shared";

export const HomeRscService = () => {
  const URI = BASEURL + "/api/v1/home";

  const getHomePosts = async () => {
    try {
      const headers = await setRscHeader();
      const response = (await fetch(URI, { headers: headers }).then((res) =>
        res.json()
      )) as Home.GetHomePostsResponseDto;

      if (response.errorCode) throw new Error(response.errorCode);

      return response;
    } catch (error) {
      console.error(error);

      throw error;
    }
  };

  return { getHomePosts };
};
