'use client';

import { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReportList } from '@/fsd_widgets/report/ui/ReportList';
import { ReportTabs } from '@/fsd_widgets/report/ui/ReportTabs';

import { useReportedList } from '@/fsd_entities/report';

export function ReportWidget() {
  const [client] = useState(() => new QueryClient());
  const type = (useSearchParams().get('type') ?? 'post') as 'post' | 'comment';
  const pageNum = 0;
  const queryResult = useReportedList(type, pageNum);

  return (
    <QueryClientProvider client={client}>
      <div className="min-h-screen max-w-md">
        <ReportTabs />
        <ReportList {...queryResult} />
      </div>
    </QueryClientProvider>
  );
}
