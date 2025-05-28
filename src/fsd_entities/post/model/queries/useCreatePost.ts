'use client';

import { useParams, useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import { createPost } from '../../api';
import { usePostCreationStore, useUploadFileStore } from '../stores';

export const useCreatePost = () => {
  const isVote = usePostCreationStore((state) => state.isVote);
  const clearPost = usePostCreationStore((state) => state.clearPost);
  const { selectedFileList, clearFileList } = useUploadFileStore(
    useShallow((state) => ({
      selectedFileList: state.selectedFileList,
      clearFileList: state.clearFileList,
    })),
  );

  const boardId = useParams().boardId;
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ title, content, isAnonymous, isQuestion }: Omit<Post.CreatePostDto, 'boardId'>) =>
      await createPost({
        postData: { title, content, isAnonymous, isQuestion, boardId: boardId as string },
        attachImageList: selectedFileList,
      }),
    onSuccess: (postId) => {
      if (isVote) {
        return postId;
      }
      router.replace(`/board/${boardId}/${postId}`);
      clearPost();
      clearFileList();
      return postId;
    },
    onError: (error: Error) => {
      toast.error(error.message ?? '게시글 생성에 실패했습니다.');
    },
  });
};
