import axios, { AxiosResponse } from "axios";

import { BASEURL, setRscHeader } from "@/shared";

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
      console.error("Error fetching post:", error);
      throw error;
    }
  };

  const postLike = () => {
    
  }

  return { getPostById };
};
