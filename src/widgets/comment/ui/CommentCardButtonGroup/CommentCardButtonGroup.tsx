import clsx from 'clsx';

import {
  ChildCommentActiveButton,
  CommentLikeButton,
  useCommentStore,
} from '@/entities/comment';

import { Divider } from '@/shared';

interface CommentCardButtonGroupProps {
  commentId: Comment.CommentDto['id'];
  isDeleted: Comment.CommentDto['isDeleted'];
  isCommentLike: Comment.CommentDto['isCommentLike'];
}

export const CommentCardButtonGroup = ({
  commentId,
  isDeleted,
  isCommentLike,
}: CommentCardButtonGroupProps) => {
  const childCommentActiveId = useCommentStore(
    (state) => state.childCommentActiveId,
  );

  return (
    <div
      className={clsx(
        `rounded-comment-br flex flex-row items-center justify-between space-x-3 px-2.5 py-1.5`,
        childCommentActiveId === commentId
          ? 'bg-overlay-btn'
          : 'bg-comment-btn',
      )}
    >
      <CommentLikeButton
        commentId={commentId}
        isDeleted={isDeleted}
        isCommentLike={isCommentLike}
      />
      <Divider vertical className="bg-gray-400" />
      <ChildCommentActiveButton commentId={commentId} isDeleted={isDeleted} />
    </div>
  );
};
