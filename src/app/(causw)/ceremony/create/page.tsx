'use client';

import { CeremonyCreateWidget } from '@/fsd_widgets/ceremony/ui/CeremonyCreateWidget';

import { PreviousButton } from '@/fsd_shared/ui/previousButton';

export default function CeremonyCreatePage() {
  return (
    <>
      <PreviousButton />
      <div className="p-12">
        <h1 className="mb-14 text-center text-3xl font-semibold">경조사 등록 신청</h1>
        <CeremonyCreateWidget />
      </div>
    </>
  );
}
