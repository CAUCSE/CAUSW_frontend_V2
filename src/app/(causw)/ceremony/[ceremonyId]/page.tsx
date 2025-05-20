'use client';

import { useParams } from 'next/navigation';

import { CeremonyDetailPage } from '@/fsd_widgets/ceremony';

import { Header } from '@/entities';
import { MESSAGES } from '@/fsd_shared';
import { PreviousButton } from '@/fsd_shared';

const OccasionNotificationDetailPage = () => {
  const { ceremonyId } = useParams<{ ceremonyId: string }>();
  console.log('occasionId', ceremonyId);
  return (
    <div className="w-full p-6">
      <PreviousButton />
      <div className="pt-12">
        <Header bold big>
          {MESSAGES.OCCASION.CEREMONY_CONTENTS}
        </Header>
        <CeremonyDetailPage ceremonyId={ceremonyId} />
      </div>
    </div>
  );
};

export default OccasionNotificationDetailPage;
