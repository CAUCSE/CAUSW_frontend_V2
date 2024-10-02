import axios, { AxiosResponse } from "axios";
import { BASEURL, setRscHeader } from "@/shared";

export const BoardRscService = () => {
  const createBoard = async (
    data: Board.CreateBoardDto
  ): Promise<Board.BoardDto> => {
    const URI = `${BASEURL}/api/v1/boards/normal`;

    try {
      const headers = await setRscHeader();
      const response: AxiosResponse<Board.BoardDto> = await axios.post(URI, data, {
        headers: headers,
      });

      if (response.status !== 201) {
        throw new Error(`Failed to create comment. Response status: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  };

  const applyBoard = async (
    data: Board.ApplyBoardDto
  ) => {
    const URI = `${BASEURL}/api/v1/boards/apply`;

    try {
      const headers = await setRscHeader();
      const response: AxiosResponse<void> = await axios.post(URI, data, {
        headers: headers,
      });

      if (response.status !== 201) {
        throw new Error(`Failed to create comment. Response status: ${response.status}`);
      }else{
        console.log(response.status);
        console.log("성공!!!!!!1");
      }
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  };

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

  return { createBoard, applyBoard, getBoardList, searchPost };
};
