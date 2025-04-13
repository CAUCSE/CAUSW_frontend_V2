'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { OccasionDetailPage } from '@/fsd_widgets/occasion/ui';

import { Header } from '@/entities';
import { MESSAGES } from '@/fsd_shared';
import { PreviousButton } from '@/fsd_shared';

const OccasionRequestDetailPage = () => {
  const { occasionId } = useParams<{ occasionId: string }>();
  return (
    <div className="w-full p-6">
      <PreviousButton />
      <div className="pt-12">
        <Header bold big>
          {MESSAGES.OCCASION.DETAIL_CONTENT_TITLE}
        </Header>
        <OccasionDetailPage occasionId={occasionId} />
      </div>
    </div>
  );
};

export default OccasionRequestDetailPage;
