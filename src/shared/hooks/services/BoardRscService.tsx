import { BASEURL } from "@/shared/configs/url";

export const BoardRscService = async () => {
  const searchPost = async (
    boardId: string,
    keyword: string,
    pageNum: string,
  ) => {
    try {
      const encodedKeyword = encodeURIComponent(keyword);
      const URI =
        BASEURL +
        `/api/v1/posts/search?boardId=${boardId}&keyword=${encodedKeyword}&pageNum=${pageNum}`;
      const response = await fetch(`${URI}`, { method: "GET" });
      if (!response.ok) {
        throw new Error(`${response.status} : ${response.statusText}`);
      }
      console.log(await response.json());
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { searchPost };
};
