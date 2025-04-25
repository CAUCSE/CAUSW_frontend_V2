'use client';

import { useParams, useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import { createPost } from '../../api';
import { usePostCreationStore, useUploadFileStore } from '../stores';

export const useCreatePost = () => {
  const { title, content, isAnonymous, isQuestion, isVote, clearPost } = usePostCreationStore(
    useShallow(state => ({
      title: state.title,
      content: state.content,
      isAnonymous: state.isAnonymous,
      isQuestion: state.isQuestion,
      isVote: state.isVote,
      clearPost: state.clearPost,
    })),
  );

  const { selectedFileList, clearFileList } = useUploadFileStore(
    useShallow(state => ({
      selectedFileList: state.selectedFileList,
      clearFileList: state.clearFileList,
    })),
  );

  const boardId = useParams().boardId;
  const router = useRouter();

  return useMutation({
    mutationFn: async () =>
      await createPost({
        postData: { title, content, isAnonymous, isQuestion, boardId: boardId as string },
        attachImageList: selectedFileList,
      }),
    onSuccess: postId => {
      router.replace(`/board/${boardId}/${postId}`);
      clearPost();
      clearFileList();
    },
    onError: (error: Error) => {
      console.error(error);
      if (isAxiosError(error)) {
        console.error(error.response?.data.message);
      }
      toast.error(error.message ?? '게시글 생성에 실패했습니다.');
    },
  });
};
