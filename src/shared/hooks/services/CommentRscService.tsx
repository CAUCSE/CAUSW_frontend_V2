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

      console.log("Post liked successfully");
    } catch (error) {
      console.error(`Error liking post with id ${commentId}:`, error);
      throw error;
    }
  };

  const deleteComment = async (commentId: string) => {
    const URI = `${BASEURL}/api/v1/comments/${commentId}`;

    try {
      const headers = await setRscHeader();
      const response: AxiosResponse<Comment.CommentDto> = await axios.delete(URI, {
        headers: headers,
      });

      if (response.status !== 200) {
        throw new Error(`Failed to delete comment with id ${commentId}. Response status: ${response.status}`);
      }

      console.log("Comment deleted successfully");
    } catch (error) {
      console.error(`Error deleting comment with id ${commentId}:`, error);
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
      console.error('Error creating comment:', error);
      throw error;
    }
  };


  return { postLikeForComment, deleteComment, createComment };
};