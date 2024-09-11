import axios, { AxiosResponse } from "axios";

import { BASEURL, setRscHeader } from "@/shared";

export const PostRscService = () => {
  const createPost = async (
    data: Post.CreatePostDto
  ): Promise<Post.PostDto> => {
    const URI = `${BASEURL}/api/v1/posts`;

    try {
      const headers = await setRscHeader();
      const response: AxiosResponse<Post.PostDto> = await axios.postForm(URI, data, {
        headers: headers,
      });

      if (response.status !== 201) {
        throw new Error(`Failed to create post. Response status: ${response.status}`);
      }
      console.log('게시글 생성했다이!!!!!!!!!!!1:',response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  };

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
      console.error("Error fetching post:", error);
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

      console.log("Post liked successfully");
    } catch (error) {
      console.error(`Error liking post with id ${postId}:`, error);
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
        throw new Error(`Failed to like post with id ${postId}. Response status: ${response.status}`);
      }

      console.log("Post liked successfully");
    } catch (error) {
      console.error(`Error liking post with id ${postId}:`, error);
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

      console.log("Post liked successfully");
    } catch (error) {
      console.error(`Error liking post with id ${postId}:`, error);
      throw error;
    }
  };


  return { createPost, getPostById, postLikeForPost, postFavorite, cancelFavorite };
};