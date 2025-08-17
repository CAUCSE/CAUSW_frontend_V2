'use client';

import { useParams, useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
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
  const mutation = useMutation({
    mutationFn: async (postData: Omit<Post.PostCreateWithFormRequestDto, 'boardId'>) => {
      return await createPostWithForm({
        postData: { ...postData, boardId },
        attachImageList: selectedFileList,
      });
    },
    onMutate: () => {
      return toast.loading('로딩 중...');
    },
    onSuccess: (data, variables, context) => {
      toast.dismiss(context);
      return data;
    },
    onError: (error: Error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? '게시글 생성에 실패했습니다.');
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.');
      }
    },
  });
  return mutation;
};
