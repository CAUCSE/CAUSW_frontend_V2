'use client';

import { ThumbsUp } from 'lucide-react';

import { Button } from '@/shadcn/components/ui';

import { useToggleLikeComment } from '../../model/queries';

interface CommentLikeButtonProps {
  commentId: Comment.CommentDto['id'];
  isDeleted: Comment.CommentDto['isDeleted'];
  isCommentLike: Comment.CommentDto['isCommentLike'];
}

export const CommentLikeButton = ({ commentId, isDeleted, isCommentLike }: CommentLikeButtonProps) => {
  const { mutate: toggleLikeComment, isPending } = useToggleLikeComment();

  const handleClickLikeButton = () => {
    toggleLikeComment({ commentId, isCommentLike });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-fit w-fit cursor-pointer"
      onClick={handleClickLikeButton}
      disabled={isDeleted || isPending}
    >
      <ThumbsUp className="size-4" />
    </Button>
  );
};
