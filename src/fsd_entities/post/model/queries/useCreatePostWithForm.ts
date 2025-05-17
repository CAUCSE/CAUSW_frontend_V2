'use client';

import { useParams, useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import { createPostWithForm } from '../../api/post';
import { usePostCreationStore, useUploadFileStore } from '../stores';

export const useCreatePostWithForm = () => {
  const clearPost = usePostCreationStore((state) => state.clearPost);
  const { selectedFileList, clearFileList } = useUploadFileStore(
    useShallow((state) => ({
      selectedFileList: state.selectedFileList,
      clearFileList: state.clearFileList,
    })),
  );
  const router = useRouter();
  const { boardId } = useParams() as { boardId: string };
  return useMutation({
    mutationFn: async (postData: Omit<Post.PostCreateWithFormRequestDto, 'boardId'>) => {
      return await createPostWithForm({
        postData: { ...postData, boardId },
        attachImageList: selectedFileList,
      });
    },
    onSuccess: (data) => {
      router.replace(`/board/${boardId}/${data}`);
      clearFileList();
      clearPost();
    },
    onError: (error: Error) => {
      toast.error(error.message ?? '게시글 생성에 실패했습니다.');
    },
  });
};
