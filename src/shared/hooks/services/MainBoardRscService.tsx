import { BASEURL, setRscHeader } from "@/shared";

export const MainBoardRscService = () => {
  const URI = BASEURL + "/api/v1/boards/main";

  const getMainBoard = async () => {
    try {
      const headers = await setRscHeader();
      const response = await fetch(URI, { method: "GET", headers: headers });

      if (response.status !== 200) {
        throw new Error(`${response.status}:${response.statusText}`);
      }

      const res = await response.json();
      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { getMainBoard };
};
