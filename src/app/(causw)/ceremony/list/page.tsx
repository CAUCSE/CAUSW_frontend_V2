'use client';

import { PreviousButton } from '@/fsd_shared/ui/previousButton';
import { CeremonyListWidget } from '@/fsd_widgets/ceremony';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function CeremonyListPage() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <PreviousButton />
      <div className="p-12">
        <h1 className="text-3xl font-semibold mb-12 mt-12 text-left">내 경조사 목록</h1>
        <CeremonyListWidget />
      </div>
    </QueryClientProvider>
  );
}
