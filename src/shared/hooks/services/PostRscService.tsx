import axios, { AxiosResponse } from "axios";

import { BASEURL, setRscHeader } from "@/shared";

export const PostRscService = () => {
  const createPost = async (
    data: Post.CreatePostDto,
    attachImageList: File[]
  ): Promise<Post.PostDto> => {
    const URI = `${BASEURL}/api/v1/posts`;

    try {
      const formData = new FormData();

      // postCreateRequestDto key로 JSON 데이터를 string 형태로 추가
      formData.append(
        'postCreateRequestDto',
        new Blob(
          [JSON.stringify({
            title: data.title,
            content: data.content,
            boardId: data.boardId,
            isAnonymous: data.isAnonymous,
            isQuestion: data.isQuestion,
          })],
          { type: 'application/json' }
        )
      );


      // attachImageList key로 파일들 추가
      attachImageList.forEach((file) => {
        formData.append('attachImageList', file, file.name); // 여러 파일 전송 가능
      });

      const headers = await setRscHeader(); // 인증 헤더 세팅 함수 호출

      // FormData로 POST 요청
      const response: AxiosResponse<Post.PostDto> = await axios.post(URI, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',  // form-data로 전송
        },
        transformRequest: [(data, headers) => {
          // Content-Type을 자동으로 설정해주는 transform
          return data;
        }],
      });

      if (response.status !== 201) {
        throw new Error(`Failed to create post. Response status: ${response.status}`);
      }

      console.log('게시글 생성 완료:', response.data);
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
