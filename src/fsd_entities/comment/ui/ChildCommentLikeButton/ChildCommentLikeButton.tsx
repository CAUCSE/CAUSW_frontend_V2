'use client';

import { ThumbsUp } from 'lucide-react';

import { Button } from '@/shadcn/components/ui';

import { useToggleLikeChildComment } from '../../model/queries/useToggleLikeChildComment';

interface ChildCommentLikeButtonProps {
  childCommentId: Comment.ChildCommentDto['id'];
  isDeleted: Comment.ChildCommentDto['isDeleted'];
  isChildCommentLike: Comment.ChildCommentDto['isChildCommentLike'];
}

export const ChildCommentLikeButton = ({
  childCommentId,
  isDeleted,
  isChildCommentLike,
}: ChildCommentLikeButtonProps) => {
  const { mutate: toggleLikeChildComment } = useToggleLikeChildComment();

  const handleLikeChildComment = () => {
    toggleLikeChildComment({ childCommentId, isChildCommentLike });
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
