'use client';

import { useParams } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import { createPost } from '../../api';
import { useUploadFileStore } from '../stores';

export const useCreatePost = () => {
  const { selectedFileList } = useUploadFileStore(
    useShallow((state) => ({
      selectedFileList: state.selectedFileList,
    })),
  );

  const boardId = useParams().boardId;

  const mutation = useMutation({
    mutationFn: async ({
      title,
      content,
      isAnonymous,
      isQuestion,
    }: Omit<Post.CreatePostDto, 'boardId'>) =>
      await createPost({
        postData: {
          title,
          content,
          isAnonymous,
          isQuestion,
          boardId: boardId as string,
        },
        attachImageList: selectedFileList,
      }),
    onMutate: () => {
      return toast.loading('로딩 중...');
    },
    onSuccess: (postId, variables, context) => {
      toast.dismiss(context);

      return postId;
    },
    onError: (error: Error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? '게시글 생성에 실패했습니다.',
        );
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.');
      }
    },
  });

  return mutation;
};
