import { CommentLikeBadge } from '@/fsd_entities/comment';

import { CommentCardButtonGroup } from '../CommentCardButtonGroup';

interface CommentCardFooterProps {
  numLike: Comment.CommentDto['numLike'];
  commentId: Comment.CommentDto['id'];
  isDeleted: Comment.CommentDto['isDeleted'];
}

export const CommentCardFooter = ({ numLike, commentId, isDeleted }: CommentCardFooterProps) => {
  return (
    <footer className="flex items-center justify-between">
      <CommentLikeBadge numLike={numLike} />
      <CommentCardButtonGroup commentId={commentId} isDeleted={isDeleted} />
    </footer>
  );
};
