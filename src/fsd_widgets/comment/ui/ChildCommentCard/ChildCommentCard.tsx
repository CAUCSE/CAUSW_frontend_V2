'use client';

import Image from 'next/image';

import { ArrowRight, EllipsisVertical, ThumbsUp } from 'lucide-react';

import { ChildCommentCardFooter } from '@/fsd_widgets/comment/ui/ChildCommentCardFooter';

import { ChildCommentActionDropdown, CommentInfoSection, CommentLikeBadge } from '@/fsd_entities/comment';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shadcn/components/ui';
import { Button, buttonVariants } from '@/shadcn/components/ui/button';
import { getTimeDifference } from '@/utils/format';

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
        <CommentCardMain content={childComment.content} isDeleted={childComment.isDeleted} />
        <ChildCommentCardFooter childComment={childComment} isChildCommentLike={childComment.isChildCommentLike} />
      </div>
    </div>
  );
};
