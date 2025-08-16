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
  const { mutate: toggleLikeChildComment, isPending } = useToggleLikeChildComment();

  const handleLikeChildComment = () => {
    toggleLikeChildComment({ childCommentId, isChildCommentLike });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="bg-comment-btn h-fit w-fit rounded-3xl px-2.5 py-1.5"
      onClick={handleLikeChildComment}
      disabled={isDeleted || isPending}
    >
      <ThumbsUp className="size-4" />
    </Button>
  );
};
