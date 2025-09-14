'use client';

import { useSearchParams } from 'next/navigation';

import { ReportList } from '@/fsd_widgets/report/ui/ReportList';
import { ReportTabs } from '@/fsd_widgets/report/ui/ReportTabs';

import { useReportedList } from '@/entities/report';

export function ReportWidget() {
  const type = (useSearchParams().get('type') ?? 'post') as 'post' | 'comment';
  const pageNum = 0;
  const queryResult = useReportedList(type, pageNum);

  return (
    <div className="min-h-screen w-full">
      <ReportTabs />
      <ReportList {...queryResult} />
    </div>
  );
}
