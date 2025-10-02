import { MessageCircle } from 'lucide-react';

import { Badge } from '@/shadcn/components/ui';

import { formatCount } from '../../model';

interface PostCommentCountBadgeProps {
  numComment: Post.PostDto['numComment'];
}

export const PostCommentCountBadge = ({
  numComment,
}: PostCommentCountBadgeProps) => {
  return (
    <Badge className="bg-post-comment text-post-comment flex items-center gap-2 rounded-2xl px-4 py-1 text-sm">
      <MessageCircle className="size-4" />
      <span>{formatCount(numComment)}</span>
    </Badge>
  );
};
