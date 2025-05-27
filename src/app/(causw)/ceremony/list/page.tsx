'use client';

import { CeremonyListWidget } from '@/fsd_widgets/ceremony';

import { PreviousButton } from '@/fsd_shared/ui/previousButton';

export default function CeremonyListPage() {
  return (
    <>
      <PreviousButton />
      <div className="p-12">
        <h1 className="mb-12 mt-12 text-left text-3xl font-semibold">내 경조사 목록</h1>
        <CeremonyListWidget />
      </div>
    </>
  );
}
