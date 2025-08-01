import axios, { AxiosResponse } from 'axios';

import { BASEURL, setRscHeader } from '@/fsd_shared';

export const PostRscService = () => {
  const getPostById = async (postId: string): Promise<Post.PostDto> => {
    const URI = `${BASEURL}/api/v1/posts/${postId}`;

    try {
      const headers = await setRscHeader();
      const response: AxiosResponse<Post.PostDto> = await axios.get(URI, {
        headers: headers,
      });

      if (response.status !== 200) {
        throw new Error(`Failed to fetch post with id ${postId}`);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const deletePost = async (postId: string) => {
    const URI = `${BASEURL}/api/v1/posts/${postId}`;

    try {
      const headers = await setRscHeader();
      const response: AxiosResponse<void> = await axios.delete(URI, {
        headers: headers,
      });

      if (response.status !== 200) {
        throw new Error(`Failed to delete post with id ${postId}. Response status: ${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  };

  const postLikeForPost = async (postId: string) => {
    const URI = `${BASEURL}/api/v1/posts/${postId}/like`;

    try {
      const headers = await setRscHeader();
      const response: AxiosResponse<void> = await axios.post(URI, null, {
        headers: headers,
      });

      if (response.status !== 201) {
        throw new Error(`Failed to like post with id ${postId}. Response status: ${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  };

  const postFavorite = async (postId: string) => {
    const URI = `${BASEURL}/api/v1/posts/${postId}/favorite`;

    try {
      const headers = await setRscHeader();
      const response: AxiosResponse<void> = await axios.post(URI, null, {
        headers: headers,
      });

      if (response.status !== 201) {
        throw new Error(`Failed to favorite post with id ${postId}. Response status: ${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  };

  const cancelFavorite = async (postId: string) => {
    const URI = `${BASEURL}/api/v1/posts/${postId}/favorite`;

    try {
      const headers = await setRscHeader();
      const response: AxiosResponse<void> = await axios.put(URI, null, {
        headers: headers,
      });

      if (response.status !== 200) {
        throw new Error(`Failed to like post with id ${postId}. Response status: ${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  };

  const getPostList = async (boardId: string | string[], pageNum: number) => {
    const URI = BASEURL + '/api/v1/posts';
    try {
      const headers = await setRscHeader();
      const response = await fetch(`${URI}?boardId=${boardId}&pageNum=${pageNum}`, { headers: headers });

      if (response.status !== 200) {
        throw new Error(`${response.status} : ${response.statusText}`);
      }
      const boardList = await response.json();
      return boardList;
    } catch (error) {
      throw error;
    }
  };

  return {
    deletePost,
    getPostById,
    postLikeForPost,
    postFavorite,
    cancelFavorite,
    getPostList,
  };
};
