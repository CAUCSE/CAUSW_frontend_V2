'use client';

import { useParams } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { ThumbsUp } from 'lucide-react';
import toast from 'react-hot-toast';

import { Button } from '@/shadcn/components/ui';

import { commentQueryKey } from '../../config';
import { useLikeChildComment } from '../../model';

interface ChildCommentLikeButtonProps {
  childCommentId: Comment.ChildCommentDto['id'];
  isDeleted: Comment.ChildCommentDto['isDeleted'];
}

export const ChildCommentLikeButton = ({ childCommentId, isDeleted }: ChildCommentLikeButtonProps) => {
  const queryClient = useQueryClient();
  const { postId } = useParams() as { postId: string };

  const { mutate: likeChildComment } = useLikeChildComment();

  const handleLikeChildComment = () => {
    likeChildComment(
      { param: { childCommentId } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: commentQueryKey.list({ postId }) });
        },
        onError: (error: Error) => {
          if (isAxiosError(error)) {
            toast.error(error.response?.data.message ?? '댓글 좋아요에 실패했습니다.');
            return;
          }
          toast.error('댓글 좋아요 실패');
        },
      },
    );
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="bg-comment-btn h-fit w-fit rounded-3xl px-2.5 py-1.5"
      onClick={handleLikeChildComment}
      disabled={isDeleted}
    >
      <ThumbsUp className="size-4" />
    </Button>
  );
};
