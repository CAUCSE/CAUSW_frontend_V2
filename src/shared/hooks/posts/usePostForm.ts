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
  const { voteTitle, options, clearVote } = useCreateVoteStore(
    useShallow((state) => ({
      voteTitle: state.voteTitle,
      options: state.options,
      clearVote: state.clearVote,
    })),
  );

  const { selectedFiles, resetFiles } = useFileUpload();

  const { useCreatePost, useCreatePostWithVote } = PostService();
  const { mutateAsync: createPost } = useCreatePost();
  const { mutateAsync: createPostWithVote } = useCreatePostWithVote();

  const handleCreatePostWithVote = async (
    postRequestDto: Post.CreatePostDto,
  ) => {
    if (voteTitle.trim().length === 0) {
      toast.error("투표 제목을 입력해주세요.");
      return;
    }

    if (options.length === 0) {
      toast.error("투표 옵션을 하나 이상 생성해주세요.");
      return;
    }

    if (options.some((option) => option.trim().length === 0)) {
      toast.error("투표 옵션을 모두 입력해주세요.");
      return;
    }

    await createPostWithVote({
      postData: postRequestDto,
      attachImageList: selectedFiles,
    });
  };

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
      await handleCreatePostWithVote(postRequest);
      return;
    }

    await createPost({
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
