'use client';

import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { CeremonyListWidget } from '@/fsd_widgets/ceremony';

import { PreviousButton } from '@/fsd_shared';

export default function CeremonyListPage() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <PreviousButton />
      <div className="p-12">
        <h1 className="mt-12 mb-12 text-left text-3xl font-semibold">내 경조사 목록</h1>
        <CeremonyListWidget />
      </div>
    </QueryClientProvider>
  );
}
