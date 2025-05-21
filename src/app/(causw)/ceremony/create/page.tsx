'use client';

import { PreviousButton } from '@/fsd_shared/ui/previousButton';
import { CeremonyCreateWidget } from "@/fsd_widgets/ceremony/ui/CeremonyCreateWidget";

export default function CeremonyCreatePage() {
  return (
    <>
      <PreviousButton />
      <div className="p-12">
        <h1 className="text-3xl font-semibold mb-14 text-center">경조사 등록 신청</h1>
        <CeremonyCreateWidget />
      </div>
    </>
  );
}
