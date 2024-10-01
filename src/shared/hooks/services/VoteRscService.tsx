import { BASEURL, setRscHeader } from "@/shared";
import axios, { AxiosResponse } from "axios";

export const VoteRscService = () => {
  const createVote = async (
    data: Post.CreateVoteDto,
  ): Promise<Post.VoteResponseDto> => {
    const URI = `${BASEURL}/api/v1/votes/create`;

    try {
      const headers = await setRscHeader();
      const response: AxiosResponse<Post.VoteResponseDto> = await axios.post(
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
      console.log("투표 생성 완료!!!!!!!!");
      return response.data;
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  };

  const getVoteById = async (voteId: string): Promise<Post.VoteResponseDto> => {
    const URI = `${BASEURL}/api/v1/votes/${voteId}`;

    try {
      const headers = await setRscHeader();
      const response: AxiosResponse<Post.VoteResponseDto> = await axios.get(URI, {
        headers: headers,
      });

      if (response.status !== 200) {
        throw new Error(`Failed to fetch post with id ${voteId}`);
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  };

  const endVoteById = async (voteId: string): Promise<Post.VoteResponseDto> => {
    const URI = `${BASEURL}/api/v1/votes/${voteId}/end`;

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
      console.error("Error fetching post:", error);
      throw error;
    }
  };

  const restartVoteById = async (voteId: string): Promise<Post.VoteResponseDto> => {
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
      console.error("Error fetching post:", error);
      throw error;
    }
  };

  const castVote = async (data: Post.CastVoteDto):Promise<string> => {
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
      console.error("Error fetching post:", error);
      throw error;
    }
  };

  

  return {
    createVote,
    getVoteById,
    endVoteById,
    restartVoteById,
    castVote,
  };
};
