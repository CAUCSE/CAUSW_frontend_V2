'use client';

import { useParams } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { EllipsisVertical } from 'lucide-react';
import toast from 'react-hot-toast';

import { commentQueryKey } from '@/fsd_entities/comment/config';
import { useDeleteComment, useSubscribeComment, useUnsubscribeComment } from '@/fsd_entities/comment/model';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shadcn/components/ui';
import { buttonVariants } from '@/shadcn/components/ui/button';

interface CommentActionDropdownProps {
  commentId: Comment.CommentDto['id'];
  isOwner: Comment.CommentDto['isOwner'];
  isCommentSubscribed: Comment.CommentDto['isCommentSubscribed'];
}

export const CommentActionDropdown = ({ commentId, isOwner, isCommentSubscribed }: CommentActionDropdownProps) => {
  const queryClient = useQueryClient();
  const { postId } = useParams() as { postId: string };
  const { mutate: deleteComment } = useDeleteComment();
  const { mutate: unsubscribeComment } = useUnsubscribeComment();
  const { mutate: subscribeComment } = useSubscribeComment();

  const handleDeleteComment = () => {
    deleteComment(
      { param: { commentId } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: commentQueryKey.list({ postId }) });
        },
        onError: (error: Error) => {
          if (isAxiosError(error)) {
            toast.error(error.response?.data.message ?? '댓글 삭제에 실패했습니다.');
            return;
          }
          toast.error('댓글 삭제에 실패했습니다.');
        },
      },
    );
  };

  const handleUnsubscribeComment = () => {
    unsubscribeComment(
      { param: { commentId } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: commentQueryKey.list({ postId }) });
        },
        onError: () => {
          toast.error('댓글 알림 해제에 실패했습니다.');
        },
      },
    );
  };

  const handleSubscribeComment = () => {
    subscribeComment(
      { param: { commentId } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: commentQueryKey.list({ postId }) });
        },
        onError: () => {
          toast.error('댓글 알림 설정에 실패했습니다.');
        },
      },
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={buttonVariants({
            variant: 'ghost',
            size: 'icon',
            className: 'cursor-pointer text-[#B4B1B1] hover:bg-transparent',
          })}
        >
          <EllipsisVertical className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isOwner && <DropdownMenuItem onClick={handleDeleteComment}>댓글 삭제</DropdownMenuItem>}
        {isCommentSubscribed ? (
          <DropdownMenuItem onClick={handleUnsubscribeComment}>댓글 알림 해제</DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={handleSubscribeComment}>댓글 알림 설정</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
