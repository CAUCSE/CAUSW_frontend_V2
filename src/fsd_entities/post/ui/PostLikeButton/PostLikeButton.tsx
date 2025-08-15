'use client';

import { useParams } from 'next/navigation';

import { ThumbsUp } from 'lucide-react';

import { Button } from '@/shadcn/components/ui';

import { formatCount, useToggleLikePost } from '../../model';

interface PostLikeButtonProps {
  numLike: Post.PostDto['numLike'];
  isPostLiked: boolean;
}

export const PostLikeButton = ({ numLike, isPostLiked }: PostLikeButtonProps) => {
  const { postId } = useParams() as { postId: string };
  const { mutate: toggleLikePost } = useToggleLikePost();

  const handleClickLikeButton = () => {
    toggleLikePost({ postId, isPostLiked });
  };
  return (
    <Button
      variant="ghost"
      className="bg-post-like text-post-like hover:bg-post-like hover:text-post-like flex cursor-pointer items-center rounded-2xl px-4 py-1 text-sm"
      onClick={handleClickLikeButton}
    >
      <ThumbsUp className="size-4" />
      <span>{formatCount(numLike)}</span>
    </Button>
  );
};
