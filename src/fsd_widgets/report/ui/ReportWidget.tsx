'use client';

import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReportList } from '@/fsd_widgets/report/ui/ReportList';
import { ReportTabs } from '@/fsd_widgets/report/ui/ReportTabs';

export function ReportWidget() {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <div className="min-h-screen">
        <ReportTabs />
        <ReportList />
      </div>
    </QueryClientProvider>
  );
}
