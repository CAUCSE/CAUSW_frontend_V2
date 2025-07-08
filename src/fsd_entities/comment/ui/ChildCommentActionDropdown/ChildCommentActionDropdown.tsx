'use client';

import { useParams } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { EllipsisVertical } from 'lucide-react';
import toast from 'react-hot-toast';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shadcn/components/ui';
import { buttonVariants } from '@/shadcn/components/ui/button';

import { commentQueryKey } from '../../config';
import { useDeleteChildComment } from '../../model';

interface ChildCommentActionDropdownProps {
  commentId: ChildComment.ChildCommentDto['id'];
  isOwner: ChildComment.ChildCommentDto['isOwner'];
}

export const ChildCommentActionDropdown = ({ commentId, isOwner }: ChildCommentActionDropdownProps) => {
  const queryClient = useQueryClient();
  const { postId } = useParams() as { postId: string };

  const { mutate: deleteChildComment } = useDeleteChildComment();

  const handleDeleteChildComment = () => {
    deleteChildComment(
      { param: { childCommentId: commentId } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: commentQueryKey.list({ postId }) });
          console.log('댓글 삭제 성공');
          console.log(queryClient.getQueryData(commentQueryKey.list({ postId })));
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={buttonVariants({ variant: 'ghost', size: 'icon', className: 'h-fit w-fit cursor-pointer' })}>
          <EllipsisVertical className="size-4 text-[#B4B1B1]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isOwner && <DropdownMenuItem onClick={handleDeleteChildComment}>댓글 삭제</DropdownMenuItem>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
