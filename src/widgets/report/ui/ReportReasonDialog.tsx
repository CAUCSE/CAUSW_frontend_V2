'use client';

import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { ReportReason, ReportReasonMeta, useReportMutation } from '@/entities/report';

import { ReportTypeBE } from '@/shared/@types/report-ui';

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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shadcn/components/ui/dialog';
import { cn } from '@/shadcn/lib/utils';

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  reportType: ReportTypeBE;
  targetId: string;
  anchorRect?: DOMRect | null;
  offset?: number;
  width?: number;
};

export function ReportReasonDialog({
  open,
  onOpenChange,
  reportType,
  targetId,
  anchorRect,
  offset = 8,
  width = 260,
}: Props) {
  const [selected, setSelected] = useState<ReportReason | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const [measuredH, setMeasuredH] = useState(320); // fallback 높이

  const { mutate: report } = useReportMutation();

  useLayoutEffect(() => {
    if (!open) return;
    const h = contentRef.current?.offsetHeight;
    if (h) setMeasuredH(h);
  }, [open]);

  const style = useMemo<React.CSSProperties>(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const menuW = Math.min(width, vw - 16); // 좌우 8px 여백 보장

    if (!anchorRect) {
      // 센터(안전한 기본값)
      return {
        position: 'fixed',
        top: Math.max(8, (vh - measuredH) / 2),
        left: Math.max(8, (vw - menuW) / 2),
        width: menuW,
      };
    }

    // 기본: 버튼 아래, 우측 정렬
    let top = anchorRect.bottom + offset;
    let left = anchorRect.right - menuW;

    // 좌우 경계 보정
    left = Math.max(8, Math.min(left, vw - menuW - 8));

    // 아래로 띄우면 하단 넘침? -> 위로 띄우기
    if (top + measuredH + 8 > vh) {
      const upTop = anchorRect.top - measuredH - offset;
      if (upTop >= 8) top = upTop;
      else {
        // 위로도 아래로도 충분치 않으면 clamp
        top = Math.max(8, Math.min(top, vh - measuredH - 8));
      }
    }

    return { position: 'fixed', top, left, width: menuW };
  }, [anchorRect, measuredH, offset, width, open]);

  const pick = (reason: ReportReason) => {
    setSelected(reason);
    setConfirmOpen(true);
  };

  const onConfirm = () => {
    if (!selected) return;
    report(
      { reportType, targetId, reportReason: selected },
      {
        onSuccess: () => {
          setConfirmOpen(false);
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        {/* ✅ positionStyle + ref로 실제 높이 측정 */}
        <DialogContent ref={contentRef} positionStyle={style} className="w-fit rounded-xl p-0">
          <DialogHeader className="px-3 pt-4">
            <DialogTitle className="text-base font-semibold">신고 사유 선택</DialogTitle>
          </DialogHeader>

          {/* 리스트 자체도 모바일에서 안전하게 */}
          <ul className="max-h-[70vh] overflow-auto pb-2">
            {Object.values(ReportReason).map((reason) => {
              const meta = ReportReasonMeta[reason];
              return (
                <li key={reason}>
                  <button
                    className={cn('hover:bg-muted w-full px-3 pb-2 text-left text-sm transition')}
                    onClick={() => pick(reason)}
                  >
                    {meta.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </DialogContent>
      </Dialog>

      {/* 확인 팝업은 중앙 모달 그대로 */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{selected ? ReportReasonMeta[selected].confirmTitle : '신고'}</AlertDialogTitle>
          </AlertDialogHeader>
          <p className="text-muted-foreground text-sm whitespace-pre-line">
            {selected ? ReportReasonMeta[selected].confirmBody : ''}
          </p>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction className={buttonVariants({ variant: 'destructive' })} onClick={onConfirm}>
              신고하기
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
