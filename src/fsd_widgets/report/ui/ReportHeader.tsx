'use client';

import { PreviousButton } from '@/fsd_shared';

export const ReportHeader = () => {
  return (
    <div className="flex flex-col items-start gap-3 py-3">
      <PreviousButton />
      <h1 className="px-4 text-xl font-semibold">신고 콘텐츠 목록</h1>
    </div>
  );
};
