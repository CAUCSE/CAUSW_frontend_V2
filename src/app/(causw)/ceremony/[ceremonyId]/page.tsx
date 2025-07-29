'use client';

import { useParams } from 'next/navigation';

import { CeremonyDetailPage } from '@/fsd_widgets/ceremony';

import { MESSAGES } from '@/fsd_shared';
import { PreviousButton } from '@/fsd_shared';

const OccasionNotificationDetailPage = () => {
  const { ceremonyId } = useParams<{ ceremonyId: string }>();

  return (
    <div className="w-full p-6">
      <PreviousButton />
      <div className="pt-12">
        <div className="text-2xl font-medium md:text-3xl">{MESSAGES.CEREMONY.CEREMONY_CONTENTS}</div>
        <CeremonyDetailPage ceremonyId={ceremonyId} />
      </div>
    </div>
  );
};

export default OccasionNotificationDetailPage;
