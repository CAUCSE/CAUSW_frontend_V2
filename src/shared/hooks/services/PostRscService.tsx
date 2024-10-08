import { BASEURL, setRscHeader } from "@/shared";
import axios, { AxiosResponse } from "axios";

export const PostRscService = () => {
  const createPost = async (
    data: Post.CreatePostDto,
    attachImageList: File[],
  ): Promise<string> => {
    const URI = `${BASEURL}/api/v1/posts`;
    try {
      const formData = new FormData();
      formData.append(
        "postCreateRequestDto",
        new Blob(
          [
            JSON.stringify({
              title: data.title,
              content: data.content,
              boardId: data.boardId,
              isAnonymous: data.isAnonymous,
              isQuestion: data.isQuestion,
            }),
          ],
          { type: "application/json" },
        ),
      );
      attachImageList.forEach((file) => {
        formData.append(
          "attachImageList",
          new Blob([file], { type: file.type }),
          file.name,
        );
      });
      const headers = await setRscHeader();
      const response: AxiosResponse<Post.PostCreateResponseDto> =
        await axios.post(URI, formData, {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
        });
      if (response.status !== 201) {
        throw new Error(
          `Failed to create post. Response status: ${response.status}`,
        );
      }
      console.log("게시글 생성 완료:", response.data);
      return response.data.id;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };

  const createPostWithForm = async (
    data: Post.PostCreateWithFormRequestDto,
    attachImageList: File[],
  ) => {
    const URI = `${BASEURL}/api/v1/posts/form`;
    try {
      const formData = new FormData();
      formData.append(
        "postCreateWithFormRequestDto",
        new Blob([JSON.stringify(data)], { type: "application/json" }),
      );

      attachImageList.forEach((file) => {
        formData.append(
          "attachImageList",
          new Blob([file], { type: file.type }),
          file.name,
        );
      });

      const headers = await setRscHeader();
      const response = await axios.post(URI, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status !== 201) {
        throw new Error(`${response.status}`);
      }
      console.log("게시글 생성 완료:", response.data);
      return response.data.id;
    } catch (error) {
      console.error("error 발생 : ", error);
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

  const deletePost = async (postId: string) => {
    const URI = `${BASEURL}/api/v1/posts/${postId}`;

    try {
      const headers = await setRscHeader();
      const response: AxiosResponse<void> = await axios.delete(URI, {
        headers: headers,
      });

      if (response.status !== 200) {
        throw new Error(
          `Failed to delete post with id ${postId}. Response status: ${response.status}`,
        );
      }

      console.log("Post deleted successfully");
    } catch (error) {
      console.error(`Error deleting post with id ${postId}:`, error);
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
        throw new Error(
          `Failed to like post with id ${postId}. Response status: ${response.status}`,
        );
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
        throw new Error(
          `Failed to favorite post with id ${postId}. Response status: ${response.status}`,
        );
      }

      console.log("Post favorite successfully");
    } catch (error) {
      console.error(`Error favorite post with id ${postId}:`, error);
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
        throw new Error(
          `Failed to like post with id ${postId}. Response status: ${response.status}`,
        );
      }

      console.log("Post liked successfully");
    } catch (error) {
      console.error(`Error liking post with id ${postId}:`, error);
      throw error;
    }
  };

  const getPostList = async (boardId: string | string[], pageNum: number) => {
    const URI = BASEURL + "/api/v1/posts";
    try {
      const headers = await setRscHeader();
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

  return {
    createPost,
    createPostWithForm,
    deletePost,
    getPostById,
    postLikeForPost,
    postFavorite,
    cancelFavorite,
    getPostList,
  };
};
