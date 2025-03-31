"use client";

import {
  PostService,
  useCreatePostStore,
  useCreateVoteStore,
  useFileUpload,
} from "@/shared";
import { useParams, useRouter } from "next/navigation";

import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";

export const usePostForm = () => {
  const router = useRouter();
  const params = useParams();
  const boardId = params.boardId;
  const { title, content, isAnonymous, isQuestion, isVote, clearPost } =
    useCreatePostStore();
  const { options, clearVote } = useCreateVoteStore(
    useShallow((state) => ({
      options: state.options,
      clearVote: state.clearVote,
    })),
  );

  const { selectedFiles, resetFiles } = useFileUpload();

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

    if (postRequest.title.trim().length === 0) {
      toast.error("게시글 제목을 입력해주세요.");
      return;
    }

    if (postRequest.content.trim().length === 0) {
      toast.error("게시글 내용을 입력해주세요.");
      return;
    }

    if (isVote) {
      if (options.length === 0) {
        toast.error("투표 옵션을 하나 이상 생성해주세요.");
        return;
      }

      if (options.some((option) => option.trim().length === 0)) {
        toast.error("투표 옵션을 모두 입력해주세요.");
        return;
      }

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
    resetFiles();
    router.back();
  };

  return { handlePostSubmit, handleBack };
};
