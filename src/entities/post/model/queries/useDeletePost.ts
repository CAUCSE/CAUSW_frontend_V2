'use client';

import { useParams, useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deletePost } from '../../api';
import { postQueryKey } from '../../config';

export const useDeletePost = () => {
  const { boardId } = useParams() as { boardId: string };
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId }: { postId: Post.PostDto['id'] }) =>
      deletePost({ postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKey.all });
      router.replace(`/board/${boardId}`);
    },
    onError: () => {
      toast.error('게시글 삭제에 실패했습니다.');
    },
  });
};
