import { setRscHeader } from "@/shared/configs/fetch";
import { BASEURL } from "@/shared/configs/url";

export const BoardListRscService = () => {
  const URI = BASEURL + "/api/v1/posts";

  const getBoardList = async (boardId: string | undefined, pageNum: number) => {
    try {
      const headers = await setRscHeader();
      console.log(`${URI}?boardId=${boardId}&pageNum=${pageNum}`);
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

  return { getBoardList };
};
