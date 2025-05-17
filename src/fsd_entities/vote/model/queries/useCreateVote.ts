'use client';

import { useParams, useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
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
    onSuccess: postId => {
      router.replace(`/board/${boardId}/${postId}`);
    },
    onError: (error: Error) => {
      toast.error(error.message ?? '투표 생성에 실패했습니다.');
    },
  });
};
