'use client';

import { useRouter } from 'next/navigation';

import { CeremonyListWidget } from '@/widgets/ceremony';

import { PreviousButton } from '@/shared';

export default function CeremonyListPage() {
  const router = useRouter();
  return (
    <div className="relative top-3 left-2 w-[calc(100%-1rem)] md:top-14 md:left-14 md:w-[calc(100%-7rem)]">
      <PreviousButton
        className="mb-8"
        routeCallback={() => router.push('/setting')}
      />
      <div className="px-4 text-xl font-bold md:text-3xl">내 경조사 목록</div>
      <CeremonyListWidget />
    </div>
  );
}
