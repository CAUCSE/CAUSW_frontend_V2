"use client";

import {
  PostService,
  useCreatePostStore,
  useCreateVoteStore,
  useFileUploadStore,
} from "@/shared";
import { useParams, useRouter } from "next/navigation";

export const usePostForm = () => {
  const router = useRouter();
  const params = useParams();
  const boardId = params.boardId;
  const { title, content, isAnonymous, isQuestion, isVote, clearPost } =
    useCreatePostStore();
  const clearVote = useCreateVoteStore((state) => state.clearVote);

  const { clearFiles, selectedFiles } = useFileUploadStore();

  const { useCreatePost, useCreatePostWithVote } = PostService();
  const { mutate: createPost } = useCreatePost();
  const { mutate: createPostWithVote } = useCreatePostWithVote();

  const handlePostSubmit = async () => {
    const postRequest: Post.CreatePostDto = {
      title,
      content,
      boardId: boardId as string,
      isAnonymous,
      isQuestion,
    };

    if (isVote) {
      createPostWithVote({
        postData: postRequest,
        attachImageList: selectedFiles,
      });
      return;
    }
    createPost({
      postData: postRequest,
      attachImageList: selectedFiles,
    });
  };

  const handleBack = () => {
    clearPost();
    clearVote();
    clearFiles();
    router.back();
  };

  return { handlePostSubmit, handleBack };
};
