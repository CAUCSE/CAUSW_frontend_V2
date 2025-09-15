import { CommentLikeBadge } from '@/entities/comment';

import { CommentCardButtonGroup } from '../CommentCardButtonGroup';

interface CommentCardFooterProps {
  numLike: Comment.CommentDto['numLike'];
  commentId: Comment.CommentDto['id'];
  isDeleted: Comment.CommentDto['isDeleted'];
  isCommentLike: Comment.CommentDto['isCommentLike'];
}

export const CommentCardFooter = ({ numLike, commentId, isDeleted, isCommentLike }: CommentCardFooterProps) => {
  return (
    <footer className="flex items-center justify-between">
      <CommentLikeBadge numLike={numLike} />
      <CommentCardButtonGroup commentId={commentId} isDeleted={isDeleted} isCommentLike={isCommentLike} />
    </footer>
  );
};
