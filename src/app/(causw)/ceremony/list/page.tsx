'use client';

import { PreviousButton } from '@/fsd_shared/ui/previousButton';
import { CeremonyListWidget } from '@/fsd_widgets/ceremony';

export default function CeremonyListPage() {
  return (
    <>
      <PreviousButton />
      <div className="p-12">
        <h1 className="text-3xl font-semibold mb-12 mt-12 text-left">내 경조사 목록</h1>
        <CeremonyListWidget />
      </div>
    </>
  );
}
