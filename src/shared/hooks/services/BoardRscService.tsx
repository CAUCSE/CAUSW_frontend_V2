import { setRscHeader } from "@/shared/configs/fetch";
import { BASEURL } from "@/shared/configs/url";

export const BoardRscService = () => {
  const getBoardList = async (boardId: string | undefined, pageNum: number) => {
    const URI = BASEURL + "/api/v1/posts";
    try {
      const headers = await setRscHeader();
      const response = await fetch(
        `${URI}?boardId=${boardId}&pageNum=${pageNum}`,
        { headers: headers },
      );

      if (response.status !== 200) {
        throw new Error(`${response.status} : ${response.statusText}`);
      }
      const boardList = await response.json();
      return boardList;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const searchPost = async (
    boardId: string,
    keyword: string,
    pageNum: number,
  ) => {
    try {
      const headers = await setRscHeader();
      const encodedKeyword = encodeURIComponent(keyword);
      const URI =
        BASEURL +
        `/api/v1/posts/search?boardId=${boardId}&keyword=${encodedKeyword}&pageNum=${pageNum}`;
      const response = await fetch(`${URI}`, {
        headers: headers,
      });
      if (!response.ok) {
        throw new Error(`${response.status} : ${response.statusText}`);
      }
      const searchResult = await response.json();
      console.log(searchResult);

      return searchResult;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { getBoardList, searchPost };
};
