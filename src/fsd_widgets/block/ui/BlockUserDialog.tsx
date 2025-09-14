'use client';

import { useBlockByChildComment, useBlockByComment, useBlockByPost } from '@/entities/block/model';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shadcn/components/ui/alert-dialog';
import { buttonVariants } from '@/shadcn/components/ui/button';

type BlockUserDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  targetId: string;
  targetKind: 'post' | 'comment' | 'childComment';
  confirmText?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
};

export function BlockUserDialog({
  open,
  onOpenChange,
  targetId,
  targetKind,
  confirmButtonText = '확인',
  cancelButtonText = '취소',
}: BlockUserDialogProps) {
  const postBlock = useBlockByPost();
  const commentBlock = useBlockByComment();
  const childBlock = useBlockByChildComment();

  const currentPending = postBlock.isPending || commentBlock.isPending || childBlock.isPending;

  const onConfirm = () => {
    const onSuccess = () => onOpenChange(false);

    if (targetKind === 'post') {
      postBlock.mutate(targetId, { onSuccess });
    } else if (targetKind === 'comment') {
      commentBlock.mutate(targetId, { onSuccess });
    } else {
      childBlock.mutate(targetId, { onSuccess });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>이 작성자의 게시물이 목록에 노출되지 않으며, 다시 해제하실 수 없습니다.</AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={currentPending}>{cancelButtonText}</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: 'destructive' })}
            onClick={onConfirm}
            disabled={currentPending}
          >
            {confirmButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
