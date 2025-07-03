'use client';

import { useParams } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { ThumbsUp } from 'lucide-react';
import toast from 'react-hot-toast';

import { commentQueryKey } from '@/fsd_entities/comment/config';

import { Button } from '@/shadcn/components/ui';

import { useLikeComment } from '../../model';

interface CommentLikeButtonProps {
  commentId: Comment.CommentDto['id'];
  isDeleted: Comment.CommentDto['isDeleted'];
}

export const CommentLikeButton = ({ commentId, isDeleted }: CommentLikeButtonProps) => {
  const queryClient = useQueryClient();
  const { postId } = useParams() as { postId: string };
  const { mutate: likeComment } = useLikeComment();

  const handleClickLikeButton = () => {
    likeComment(
      { param: { commentId } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: commentQueryKey.list({ postId }),
          });
        },
        onError: (error: Error) => {
          if (isAxiosError(error)) {
            toast.error(error.response?.data.message ?? '댓글 좋아요에 실패했습니다.');
            return;
          }
          toast.error('댓글 좋아요에 실패했습니다.');
        },
      },
    );
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-fit w-fit cursor-pointer"
      onClick={handleClickLikeButton}
      disabled={isDeleted}
    >
      <ThumbsUp className="size-4" />
    </Button>
  );
};
