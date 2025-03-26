import axios, { AxiosResponse } from "axios";

import { BASEURL, setRscHeader } from "@/shared";

export const CommentRscService = () => {
  const postLikeForComment = async (commentId: string) => {
    const URI = `${BASEURL}/api/v1/comments/${commentId}/like`;

    try {
      const headers = await setRscHeader();
      const response: AxiosResponse<void> = await axios.post(URI, null, {
        headers: headers,
      });

      if (response.status !== 201) {
        throw new Error(`Failed to like post with id ${commentId}. Response status: ${response.status}`);
      }

    } catch (error) {
      throw error;
    }
  };

  const deleteCommentById = async (commentId: string) => {
    const URI = `${BASEURL}/api/v1/comments/${commentId}`;

    try {
      const headers = await setRscHeader();
      const response: AxiosResponse<Comment.CommentDto> = await axios.delete(URI, {
        headers: headers,
      });

      if (response.status !== 200) {
        throw new Error(`Failed to delete comment with id ${commentId}. Response status: ${response.status}`);
      }

    } catch (error) {
      throw error;
    }
  };

  const createComment = async (
    data: Comment.CreateCommentDto
  ): Promise<Comment.CommentDto> => {
    const URI = `${BASEURL}/api/v1/comments`;

    try {
      const headers = await setRscHeader();
      const response: AxiosResponse<Comment.CommentDto> = await axios.post(URI, data, {
        headers: headers,
      });

      if (response.status !== 201) {
        throw new Error(`Failed to create comment. Response status: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  };


  return { postLikeForComment, deleteCommentById, createComment };
};