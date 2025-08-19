import { ThumbsUp } from 'lucide-react';

import { Badge } from '@/shadcn/components/ui';

interface CommentLikeBadgeProps {
  numLike: Comment.CommentDto['numLike'];
}

export const CommentLikeBadge = ({ numLike }: CommentLikeBadgeProps) => {
  const totalCount = (count: number) => {
    return count > 999 ? '999+' : count;
  };
  return (
    <Badge variant="outline" className="text-post-like flex items-center justify-start gap-2 border-none outline-none">
      <span>
        <ThumbsUp className="size-4" />
      </span>
      <span className="text-sm">{totalCount(numLike)}</span>
    </Badge>
  );
};
