'use client';

import { useParams, useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

import { createVote } from '../../api';

export const useCreateVote = () => {
  const router = useRouter();
  const { boardId } = useParams() as { boardId: string };
  return useMutation({
    mutationFn: async (voteData: Post.CreateVoteDto) => {
      await createVote(voteData);
      return voteData.postId;
    },
    onSuccess: (postId) => {
      router.replace(`/board/${boardId}/${postId}`);
    },
    onError: (error: Error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? '게시글 생성에 실패했습니다.');
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.');
      }
    },
  });
};
