import { ThumbsUp } from 'lucide-react';

import { Button } from '@/shadcn/components/ui';

import { formatCount } from '../../model';

interface PostLikeButtonProps {
  numLike: Post.PostDto['numLike'];
}

export const PostLikeButton = ({ numLike }: PostLikeButtonProps) => {
  return (
    <Button
      variant="ghost"
      className="bg-post-like text-post-like hover:bg-post-like hover:text-post-like flex cursor-pointer items-center rounded-2xl px-4 py-1 text-sm"
      onClick={() => {}}
    >
      <ThumbsUp className="size-4" />
      <span>{formatCount(numLike)}</span>
    </Button>
  );
};
