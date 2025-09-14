'use client';

import { useRef, useState } from 'react';

import { useParams } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { EllipsisVertical } from 'lucide-react';
import toast from 'react-hot-toast';

import { BlockUserDialog } from '@/fsd_widgets/block';
import { ReportReasonDialog } from '@/fsd_widgets/report';

import { commentQueryKey } from '@/entities/comment/config';
import { useDeleteComment, useSubscribeComment, useUnsubscribeComment } from '@/entities/comment/model';
import { getUserRole } from '@/entities/user';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shadcn/components/ui';
import { buttonVariants } from '@/shadcn/components/ui/button';

interface CommentActionDropdownProps {
  commentId: Comment.CommentDto['id'];
  isOwner: Comment.CommentDto['isOwner'];
  isCommentSubscribed: Comment.CommentDto['isCommentSubscribed'];
}

export const CommentActionDropdown = ({ commentId, isOwner, isCommentSubscribed }: CommentActionDropdownProps) => {
  const queryClient = useQueryClient();
  const isAdmin = getUserRole(['ADMIN']);
  const { postId } = useParams() as { postId: string };

  const { mutate: deleteComment } = useDeleteComment();
  const { mutate: unsubscribeComment } = useUnsubscribeComment();
  const { mutate: subscribeComment } = useSubscribeComment();

  const [reportOpen, setReportOpen] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const openReport = () => {
    setAnchorRect(triggerRef.current?.getBoundingClientRect() ?? null);
    setReportOpen(true);
  };

  const openBlock = () => {
    setBlockOpen(true);
  };

  const handleDeleteComment = () => {
    deleteComment(
      { param: { commentId } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: commentQueryKey.list({ postId }),
          });
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
          queryClient.invalidateQueries({
            queryKey: commentQueryKey.list({ postId }),
          });
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
          queryClient.invalidateQueries({
            queryKey: commentQueryKey.list({ postId }),
          });
        },
        onError: () => {
          toast.error('댓글 알림 설정에 실패했습니다.');
        },
      },
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            ref={triggerRef}
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
          {(isOwner || isAdmin) && <DropdownMenuItem onClick={handleDeleteComment}>댓글 삭제</DropdownMenuItem>}

          {isCommentSubscribed ? (
            <DropdownMenuItem onClick={handleUnsubscribeComment}>댓글 알림 해제</DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={handleSubscribeComment}>댓글 알림 설정</DropdownMenuItem>
          )}

          {!isOwner && (
            <>
              <DropdownMenuItem onClick={openReport}>신고하기</DropdownMenuItem>
              <DropdownMenuItem onClick={openBlock}>차단하기</DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <ReportReasonDialog
        open={reportOpen}
        onOpenChange={setReportOpen}
        reportType="COMMENT"
        targetId={commentId}
        anchorRect={anchorRect}
        width={260}
        offset={8}
      />

      <BlockUserDialog open={blockOpen} onOpenChange={setBlockOpen} targetId={commentId} targetKind="comment" />
    </>
  );
};
