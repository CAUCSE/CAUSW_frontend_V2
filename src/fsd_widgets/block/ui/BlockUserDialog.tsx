'use client';

import { useRouter } from 'next/navigation';

import { useBlockByChildComment, useBlockByComment, useBlockByPost } from '@/fsd_entities/block/model';

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
  onBlocked?: () => void;
};

export function BlockUserDialog({
  open,
  onOpenChange,
  targetId,
  targetKind,
  confirmButtonText = '확인',
  cancelButtonText = '취소',
  onBlocked,
}: BlockUserDialogProps) {
  const router = useRouter();

  const postBlock = useBlockByPost();
  const commentBlock = useBlockByComment();
  const childBlock = useBlockByChildComment();

  const currentPending = postBlock.isPending || commentBlock.isPending || childBlock.isPending;

  const handleSuccess = () => {
    onOpenChange(false);
    if (onBlocked) {
      onBlocked();
    } else {
      router.refresh();
    }
  };

  const onConfirm = () => {
    if (targetKind === 'post') {
      postBlock.mutate(targetId, { onSuccess: handleSuccess });
    } else if (targetKind === 'comment') {
      commentBlock.mutate(targetId, { onSuccess: handleSuccess });
    } else {
      childBlock.mutate(targetId, { onSuccess: handleSuccess });
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
