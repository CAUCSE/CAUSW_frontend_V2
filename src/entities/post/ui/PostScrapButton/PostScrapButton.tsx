'use client';

import { useParams } from 'next/navigation';

import { Star } from 'lucide-react';

import { Button } from '@/shadcn/components/ui';

import { formatCount, useToggleScrapPost } from '../../model';

interface PostScrapButtonProps {
  numFavorite: Post.PostDto['numFavorite'];
  isPostFavorite: boolean;
}

export const PostScrapButton = ({
  numFavorite,
  isPostFavorite,
}: PostScrapButtonProps) => {
  const { postId } = useParams() as { postId: string };
  const { mutate: toggleScrapPost, isPending } = useToggleScrapPost();

  const handleClickScrapButton = () => {
    toggleScrapPost({ postId, isPostFavorite });
  };

  return (
    <Button
      variant="ghost"
      className="bg-post-star text-post-star hover:bg-post-star hover:text-post-star flex cursor-pointer items-center rounded-2xl px-4 py-1 text-sm"
      onClick={handleClickScrapButton}
      disabled={isPending}
    >
      <Star className="size-4" />
      <span>{formatCount(numFavorite)}</span>
    </Button>
  );
};
