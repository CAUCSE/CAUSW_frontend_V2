'use client';

import { CeremonyCreateWidget } from '@/fsd_widgets/ceremony';
import { PreviousButton } from '@/fsd_shared';

export default function CeremonyCreatePage() {
  return (
    <div className="relative top-3 left-4 w-[calc(100%-2rem)] md:top-14 md:left-14 md:w-[calc(100%-7rem)] pb-12">
      <PreviousButton className="mb-8" />
      <div className="mb-14 text-center text-2xl font-medium md:text-3xl">
        경조사 등록 신청
      </div>
      <CeremonyCreateWidget />
    </div>
  );
}