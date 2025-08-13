'use client';

import { useEffect, useState } from 'react';

import { useDropUser } from '@/fsd_entities/user';

import { Button } from '@/shadcn/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/shadcn/components/ui/dialog';
import { Textarea } from '@/shadcn/components/ui/textarea';
import { cn } from '@/shadcn/lib/utils';

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  defaultReasonPlaceholder?: string;
  userId: string;
  submitLabel?: string;
  className?: string;
};

export function RemoveMemberDialog({
  open,
  onOpenChange,
  defaultReasonPlaceholder = '추방 사유 작성',
  userId,
  submitLabel = '추방하기',
  className,
}: Props) {
  const [reason, setReason] = useState('');
  const { mutate, isPending } = useDropUser();

  useEffect(() => {
    if (!open) setReason('');
  }, [open]);

  const onSubmit = () => {
    if (!reason.trim()) return;
    mutate(
      { userId, reason: reason.trim() },
      {
        onSuccess: () => onOpenChange(false),
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'fixed top-1/3 left-1/2 max-w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 sm:p-8',
          className,
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold">추방하기</DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          <p className="mb-3 text-center text-xl font-bold text-red-500">추방 사유 작성</p>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={defaultReasonPlaceholder}
            className="h-56 resize-none rounded-2xl"
          />
        </div>

        <div className="mt-6 flex items-center justify-center">
          <Button
            size="lg"
            className="w-full max-w-[360px] rounded-xl bg-red-500 text-white hover:bg-red-600"
            onClick={onSubmit}
            disabled={isPending || !reason.trim()}
          >
            {submitLabel}
          </Button>
        </div>

        <DialogClose asChild>
          <button
            aria-label="닫기"
            className="absolute top-4 right-4 text-2xl leading-none opacity-60 hover:opacity-100"
          >
            ×
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
