'use client';

import { useParams } from 'next/navigation';

import { Star } from 'lucide-react';

import { Button } from '@/shadcn/components/ui';

import { formatCount, useScrapPost } from '../../model';

interface PostScrapButtonProps {
  numFavorite: Post.PostDto['numFavorite'];
}

export const PostScrapButton = ({ numFavorite }: PostScrapButtonProps) => {
  const { postId } = useParams() as { postId: string };
  const { mutate: handleScrapPost } = useScrapPost();

  const handleClickScrapButton = () => {
    handleScrapPost({ postId });
  };

  return (
    <Button
      variant="ghost"
      className="bg-post-star text-post-star hover:bg-post-star hover:text-post-star flex cursor-pointer items-center rounded-2xl px-4 py-1 text-sm"
      onClick={handleClickScrapButton}
    >
      <Star className="size-4" />
      <span>{formatCount(numFavorite)}</span>
    </Button>
  );
};
