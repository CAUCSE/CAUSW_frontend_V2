import { ChildCommentLikeButton, CommentLikeBadge } from '@/fsd_entities/comment';

interface ChildCommentCardFooterProps {
  childComment: Pick<ChildComment.ChildCommentDto, 'numLike' | 'id' | 'isDeleted'>;
}

export const ChildCommentCardFooter = ({ childComment }: ChildCommentCardFooterProps) => {
  return (
    <footer className="flex items-center justify-between">
      <CommentLikeBadge numLike={childComment.numLike} />
      <ChildCommentLikeButton childCommentId={childComment.id} isDeleted={childComment.isDeleted} />
    </footer>
  );
};
