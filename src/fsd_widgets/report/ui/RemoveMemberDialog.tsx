'use client';

import { useEffect, useState } from 'react';

import { ReportTypeBE, useReportMutation } from '@/fsd_entities/report';

import { Button } from '@/shadcn/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/shadcn/components/ui/dialog';
import { Textarea } from '@/shadcn/components/ui/textarea';
import { cn } from '@/shadcn/lib/utils';

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  defaultReasonPlaceholder?: string;
  targetId: string;
  reportType: ReportTypeBE; // 'POST' | 'COMMENT' | 'CHILD_COMMENT'
  submitLabel?: string;
  className?: string;
};

export function RemoveMemberDialog({
  open,
  onOpenChange,
  defaultReasonPlaceholder = '추방 사유 작성',
  targetId,
  reportType,
  submitLabel = '추방하기',
  className,
}: Props) {
  const [reason, setReason] = useState('');
  const { mutate, isPending } = useReportMutation();

  useEffect(() => {
    if (!open) setReason('');
  }, [open]);

  const onSubmit = () => {
    if (!reason.trim()) return;
    mutate(
      { reportType, targetId, reportReason: reason.trim() },
      {
        onSuccess: () => onOpenChange(false),
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn('max-w-[480px] rounded-2xl p-6 sm:p-8', className)}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold">{'추방하기'}</DialogTitle>
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
