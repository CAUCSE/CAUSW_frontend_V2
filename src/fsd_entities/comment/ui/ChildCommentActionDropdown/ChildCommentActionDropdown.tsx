'use client';

import { useRef, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { EllipsisVertical } from 'lucide-react';
import toast from 'react-hot-toast';

import { BlockUserDialog } from '@/fsd_widgets/block';
import { ReportReasonDialog } from '@/fsd_widgets/report';

import { getUserRole } from '@/fsd_entities/user';

import { postQueryKey } from '@/fsd_shared';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shadcn/components/ui';
import { buttonVariants } from '@/shadcn/components/ui/button';

import { commentQueryKey } from '../../config';
import { useDeleteChildComment } from '../../model';

interface ChildCommentActionDropdownProps {
  commentId: ChildComment.ChildCommentDto['id'];
  isOwner: ChildComment.ChildCommentDto['isOwner'];
}

export const ChildCommentActionDropdown = ({ commentId, isOwner }: ChildCommentActionDropdownProps) => {
  const router = useRouter(); // ✅
  const queryClient = useQueryClient();
  const isAdmin = getUserRole(['ADMIN']);
  const { boardId, postId } = useParams() as { boardId: string; postId: string }; // ✅ 둘 다 가져오기

  const { mutate: deleteChildComment } = useDeleteChildComment();

  const [reportOpen, setReportOpen] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const openReport = () => {
    setAnchorRect(triggerRef.current?.getBoundingClientRect() ?? null);
    setReportOpen(true);
  };

  const openBlock = () => setBlockOpen(true);

  const handleDeleteChildComment = () => {
    deleteChildComment(
      { param: { childCommentId: commentId } },
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

  const handleBlockSuccess = () => {
    const postPath = `/board/${encodeURIComponent(boardId)}/${encodeURIComponent(postId)}`;
    router.replace(postPath);

    setTimeout(() => router.refresh(), 0);
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
              className: 'h-fit w-fit cursor-pointer',
            })}
          >
            <EllipsisVertical className="size-4 text-[#B4B1B1]" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {(isOwner || isAdmin) && <DropdownMenuItem onClick={handleDeleteChildComment}>댓글 삭제</DropdownMenuItem>}
          {!isOwner && (
            <>
              <DropdownMenuItem onClick={openReport}>신고하기</DropdownMenuItem>
              <DropdownMenuItem onClick={openBlock}>차단하기</DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 신고: 위치 기반 패널 */}
      <ReportReasonDialog
        open={reportOpen}
        onOpenChange={setReportOpen}
        reportType="CHILD_COMMENT"
        targetId={commentId}
        anchorRect={anchorRect}
        width={260}
        offset={8}
      />

      {/* 차단: 성공 시 현재 글 경로로 replace 후 refresh → 서버가 403/404면 not-found.tsx로 전환 */}
      <BlockUserDialog
        open={blockOpen}
        onOpenChange={setBlockOpen}
        targetId={commentId}
        targetKind="comment"
        onBlocked={handleBlockSuccess}
      />
    </>
  );
};
