'use client';

import { useParams, useSearchParams } from 'next/navigation';

import { CeremonyDetailPage } from '@/widgets/ceremony';

import { MESSAGES } from '@/shared';
import { PreviousButton } from '@/shared';

const OccasionNotificationDetailPage = () => {
  const { ceremonyId } = useParams<{ ceremonyId: string }>();
  const searchParams = useSearchParams();
  const context = searchParams.get('context') as 'my' | 'general';

  return (
    <div className="w-full p-6">
      <PreviousButton />
      <div className="pt-12">
        <div className="text-2xl font-medium md:text-3xl">{MESSAGES.CEREMONY.CEREMONY_CONTENTS}</div>
        <CeremonyDetailPage ceremonyId={ceremonyId} context={context} />
      </div>
    </div>
  );
};

export default OccasionNotificationDetailPage;
