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

  const validatePost = (postRequestDto: Post.CreatePostDto): string | null => {
    if (postRequestDto.title.trim().length === 0)
      return "게시글 제목을 입력해주세요.";
    if (postRequestDto.content.trim().length === 0)
      return "게시글 내용을 입력해주세요.";
    return null;
  };

  const validateVote = (): string | null => {
    if (voteTitle.trim().length === 0) return "투표 제목을 입력해주세요.";
    if (options.length === 0) return "투표 옵션을 하나 이상 생성해주세요.";
    if (options.some((option) => option.trim().length === 0))
      return "투표 옵션을 모두 입력해주세요.";
    return null;
  };

  const handleCreatePostWithVote = async (
    postRequestDto: Post.CreatePostDto,
  ) => {
    const validateVoteError = validateVote();
    if (validateVoteError) {
      toast.error(validateVoteError);
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

    const validatePostError = validatePost(postRequest);
    if (validatePostError) {
      toast.error(validatePostError);
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
