'use client';

import { useParams } from 'next/navigation';

import { OccasionDetailPage } from '@/fsd_widgets/occasion';

import { Header } from '@/entities';
import { MESSAGES } from '@/fsd_shared';
import { PreviousButton } from '@/fsd_shared';

const OccasionNotificationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  console.log('occasionId', id);
  return (
    <div className="w-full p-6">
      <PreviousButton />
      <div className="pt-12">
        <Header bold big>
          {MESSAGES.OCCASION.CEREMONY_CONTENTS}
        </Header>
        <OccasionDetailPage occasionId={id} user={true} />
      </div>
    </div>
  );
};

export default OccasionNotificationDetailPage;
