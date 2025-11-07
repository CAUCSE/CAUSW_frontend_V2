'use client';

import { ArrowRight } from 'lucide-react';

import { ChildCommentCardFooter } from '@/widgets/comment/ui/ChildCommentCardFooter';

import { ChildCommentCardHeader } from '../ChildCommentCardHeader';
import { CommentCardMain } from '../CommentCardMain';

interface ChildCommentCardProps {
  childComment: Comment.ChildCommentDto;
}

export const ChildCommentCard = ({ childComment }: ChildCommentCardProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="p-2">
        <ArrowRight />
      </div>
      <div className="rounded-post-br shadow-post-sh flex w-full max-w-sm flex-col gap-2 border bg-white p-3">
        <ChildCommentCardHeader childComment={childComment} />
        <CommentCardMain
          content={childComment.content}
          isDeleted={childComment.isDeleted}
        />

        {/* ✅ isBlocked일 때 Footer 숨김 */}
        {!childComment.isBlocked && (
          <ChildCommentCardFooter
            childComment={childComment}
            isChildCommentLike={childComment.isChildCommentLike}
          />
        )}
      </div>
    </div>
  );
};
