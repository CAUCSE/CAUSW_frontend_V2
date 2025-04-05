import axios, { AxiosResponse } from 'axios';

import { BASEURL, setRscHeader } from '@/shared';

export const ChildCommentRscService = () => {
  const postLikeForChildComment = async (childCommentId: string) => {
    const URI = `${BASEURL}/api/v1/child-comments/${childCommentId}/like`;

    try {
      const headers = await setRscHeader();
      const response: AxiosResponse<void> = await axios.post(URI, null, {
        headers: headers,
      });

      if (response.status !== 201) {
        throw new Error(`Failed to like post with id ${childCommentId}. Response status: ${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  };

  const deleteChildComment = async (childCommentId: string) => {
    const URI = `${BASEURL}/api/v1/child-comments/${childCommentId}`;

    try {
      const headers = await setRscHeader();
      const response: AxiosResponse<Comment.CommentDto> = await axios.delete(URI, {
        headers: headers,
      });

      if (response.status !== 200) {
        throw new Error(
          `Failed to delete child comment with id ${childCommentId}. Response status: ${response.status}`,
        );
      }
    } catch (error) {
      throw error;
    }
  };

  const createChildComment = async (
    data: ChildComment.CreateChildCommentDto,
  ): Promise<ChildComment.ChildCommentDto> => {
    const URI = `${BASEURL}/api/v1/child-comments`;

    try {
      const headers = await setRscHeader();
      const response: AxiosResponse<ChildComment.ChildCommentDto> = await axios.post(URI, data, {
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

  return { postLikeForChildComment, deleteChildComment, createChildComment };
};
