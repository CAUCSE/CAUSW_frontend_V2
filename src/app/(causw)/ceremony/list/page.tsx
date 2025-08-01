'use client';

import { CeremonyListWidget } from '@/fsd_widgets/ceremony';
import { PreviousButton } from '@/fsd_shared';

export default function CeremonyListPage() {
  return (
    <div className="relative top-3 left-4 w-[calc(100%-2rem)] md:top-14 md:left-14 md:w-[calc(100%-7rem)]">
      <PreviousButton className="mb-8" />
      <div className="mb-6 text-2xl font-medium md:text-3xl">
        내 경조사 목록
      </div>
      <CeremonyListWidget />
    </div>
  );
}