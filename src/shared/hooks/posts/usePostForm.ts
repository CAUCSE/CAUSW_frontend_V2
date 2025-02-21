"use client";

import {
  PostRscService,
  VoteRscService,
  useCreatePostStore,
  useCreateVoteStore,
  useFileUploadStore,
} from "@/shared";
import { useParams, useRouter } from "next/navigation";

import toast from "react-hot-toast";

export const usePostForm = () => {
  const router = useRouter();
  const params = useParams();
  const boardId = params.boardId;
  const { title, content, isAnonymous, isQuestion, clearPost } =
    useCreatePostStore();
  const {
    isVote,
    voteTitle,
    options,
    isMultipleChoice,
    allowAnonymous,
    clearVote,
  } = useCreateVoteStore();

  const { clearFiles, selectedFiles } = useFileUploadStore();

  const { createPost } = PostRscService();
  const { createVote } = VoteRscService();

  const handlePostSubmit = async () => {
    const postRequest: Post.CreatePostDto = {
      title,
      content,
      boardId: boardId as string,
      isAnonymous,
      isQuestion,
    };
    try {
      const createPostResponse = await createPost(postRequest, selectedFiles);
      clearPost();
      clearFiles();
      if (isVote) {
        const voteRequest: Post.CreateVoteDto = {
          title: voteTitle,
          allowAnonymous: allowAnonymous,
          allowMultiple: isMultipleChoice,
          options: options,
          postId: createPostResponse,
        };
        try {
          await createVote(voteRequest);
          clearVote();
        } catch (error) {
          toast.error("투표 생성에 실패했습니다.");
        }
      }
      router.back();
    } catch (error) {
      toast.error("게시글 생성에 실패했습니다.");
    }
  };

  const handleBack = () => {
    clearPost();
    clearVote();
    clearFiles();
    router.back();
  };

  return { handlePostSubmit, handleBack };
};
