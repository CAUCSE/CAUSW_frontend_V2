import { BASEURL, setRscHeader } from "@/shared";
import axios, { AxiosResponse } from "axios";

import { API } from "@/shared";

export const VoteRscService = () => {
  const getVoteById = async (voteId: string): Promise<Post.VoteResponseDto> => {
    const URI = `${BASEURL}/api/v1/votes/${voteId}`;

    try {
      const headers = await setRscHeader();
      const response: AxiosResponse<Post.VoteResponseDto> = await axios.get(
        URI,
        {
          headers: headers,
        },
      );

      if (response.status !== 200) {
        throw new Error(`Failed to fetch post with id ${voteId}`);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const endVoteById = async (voteId: string): Promise<Post.VoteResponseDto> => {
    try {
      const response = (await API.post(
        `${BASEURL}/api/v1/votes/${voteId}/end`,
        {
          params: { voteId },
        },
      )) as AxiosResponse<any>; // 타입 변경

      return response.data.result; // 서버에서 받은 데이터를 리턴
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "투표 종료 실패");
      } else {
        throw new Error("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  /* const restartVoteById = async (voteId: string): Promise<Post.VoteResponseDto> => {
    const URI = `${BASEURL}/api/v1/votes/${voteId}/restart`;

    try {
      const headers = await setRscHeader();
      const response: AxiosResponse<Post.VoteResponseDto> = await axios.post(URI, {
        headers: headers,
      });

      if (response.status !== 200) {
        throw new Error(`Failed to fetch post with id ${voteId}`);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }; */

  const restartVoteById = async (
    voteId: string,
  ): Promise<Post.VoteResponseDto> => {
    try {
      const response = (await API.post(
        `${BASEURL}/api/v1/votes/${voteId}/restart`,
        {
          params: { voteId },
        },
      )) as AxiosResponse<any>; // 타입 변경

      return response.data.result; // 서버에서 받은 데이터를 리턴
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "투표 재시작 실패");
      } else {
        throw new Error("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const castVote = async (data: Post.CastVoteDto): Promise<string> => {
    const URI = `${BASEURL}/api/v1/votes/cast`;

    try {
      const headers = await setRscHeader();
      const response: AxiosResponse<string> = await axios.post(URI, data, {
        headers: headers,
      });

      if (response.status !== 200) {
        throw new Error(`Failed to vote`);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    getVoteById,
    endVoteById,
    restartVoteById,
    castVote,
  };
};
