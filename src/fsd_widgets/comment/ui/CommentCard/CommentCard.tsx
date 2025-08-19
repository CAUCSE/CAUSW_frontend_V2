'use client';

import clsx from 'clsx';

import { useCommentStore } from '@/fsd_entities/comment';

import { CommentCardFooter } from '../CommentCardFooter';
import { CommentCardHeader } from '../CommentCardHeader';
import { CommentCardMain } from '../CommentCardMain';

interface CommentCardProps {
  comment: Comment.CommentDto;
}

export const CommentCard = ({ comment }: CommentCardProps) => {
  const childCommentActiveId = useCommentStore((state) => state.childCommentActiveId);

  return (
    <div
      className={clsx(
        `rounded-post-br shadow-post-sh mb-4 flex max-w-sm flex-col gap-2 border p-3`,
        childCommentActiveId === comment.id ? 'bg-overlay-bg' : 'bg-white',
      )}
    >
      <CommentCardHeader comment={comment} />
      <CommentCardMain content={comment.content} isDeleted={comment.isDeleted} />
      <CommentCardFooter
        numLike={comment.numLike}
        commentId={comment.id}
        isDeleted={comment.isDeleted}
        isCommentLike={comment.isCommentLike}
      />
    </div>
  );
};
