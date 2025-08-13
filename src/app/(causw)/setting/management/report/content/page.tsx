'use client';

import { ReportWidget } from '@/fsd_widgets/report/ui/ReportWidget';

import { PreviousButton } from '@/fsd_shared';

export default function ReportContentPage() {
  return (
    <div className="relative top-3 left-4 w-[calc(100%-2rem)] md:top-14 md:left-14 md:w-[calc(100%-7rem)]">
      <PreviousButton className="mb-8" />
      <h1 className="my-4 px-4 text-xl font-medium md:text-3xl">신고 콘텐츠 목록</h1>
      <ReportWidget />
    </div>
  );
}
