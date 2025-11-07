'use client';

import { MessageCircleMore } from 'lucide-react';

import { Button } from '@/shadcn/components/ui';

import { useCommentStore } from '../../model';

interface ChildCommentActiveButtonProps {
  commentId: Comment.CommentDto['id'];
  isDeleted: Comment.CommentDto['isDeleted'];
}

export const ChildCommentActiveButton = ({
  commentId,
  isDeleted,
}: ChildCommentActiveButtonProps) => {
  const { childCommentActiveId, setChildCommentActiveId } = useCommentStore();

  const handleClickChildCommentActiveButton = () => {
    if (childCommentActiveId === commentId) {
      setChildCommentActiveId(undefined);
      return;
    }
    setChildCommentActiveId(commentId);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-fit w-fit cursor-pointer"
      onClick={handleClickChildCommentActiveButton}
      disabled={isDeleted}
    >
      <MessageCircleMore className="size-4" />
    </Button>
  );
};
