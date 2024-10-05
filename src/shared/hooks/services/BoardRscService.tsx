import { BASEURL, setRscHeader } from "@/shared";
import axios, { AxiosResponse } from "axios";

export const BoardRscService = () => {
  const getMainBoardList = async () => {
    const URI = `${BASEURL}/api/v1/boards/main`;
    try {
      const headers = await setRscHeader();
      const response = await fetch(URI, { headers: headers });
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const res = await response.json();
      return res;
    } catch (error) {
      throw error;
    }
  };

  const createBoard = async (
    data: Board.CreateBoardDto,
  ): Promise<Board.BoardDto> => {
    const URI = `${BASEURL}/api/v1/boards/create`;

    try {
      const headers = await setRscHeader();
      const response: AxiosResponse<Board.BoardDto> = await axios.post(
        URI,
        data,
        {
          headers: headers,
        },
      );

      if (response.status !== 201) {
        throw new Error(
          `Failed to create comment. Response status: ${response.status}`,
        );
      }

      return response.data;
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  };

  const applyBoard = async (data: Board.ApplyBoardDto) => {
    const URI = `${BASEURL}/api/v1/boards/apply`;

    try {
      const headers = await setRscHeader();
      const response: AxiosResponse<void> = await axios.post(URI, data, {
        headers: headers,
      });

      if (response.status !== 201) {
        throw new Error(
          `Failed to create comment. Response status: ${response.status}`,
        );
      }
    } catch (error) {
      console.error("Error creating comment:", error);
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

  return {
    getMainBoardList,
    createBoard,
    applyBoard,
    searchPost,
  };
};
