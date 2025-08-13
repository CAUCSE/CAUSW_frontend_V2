'use client';

import { useState } from 'react';

import { useParams, useSearchParams } from 'next/navigation';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReportList } from '@/fsd_widgets/report';
import { ReportTabs } from '@/fsd_widgets/report';

import { useUserReportedList } from '@/fsd_entities/report';

export function UserReportWidget() {
  const [client] = useState(() => new QueryClient());
  const { id } = useParams<{ id: string }>();
  const type = (useSearchParams().get('type') ?? 'post') as 'post' | 'comment';
  const pageNum = 0;

  const queryResult = useUserReportedList(type, id, pageNum);

  return (
    <QueryClientProvider client={client}>
      <div className="min-h-screen max-w-md">
        <ReportTabs />
        <ReportList {...queryResult} />
      </div>
    </QueryClientProvider>
  );
}
