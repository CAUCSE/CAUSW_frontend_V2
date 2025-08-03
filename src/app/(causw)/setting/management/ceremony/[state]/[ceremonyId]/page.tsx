'use client';

import { useParams } from 'next/navigation';

import { AdminCeremonyDetail } from '@/fsd_widgets/ceremony';

import { Header } from '@/entities';
import { MESSAGES } from '@/fsd_shared';
import { PreviousButton } from '@/fsd_shared';

const OccasionRequestDetailPage = () => {
  const { ceremonyId } = useParams<{ ceremonyId: string }>();
  return (
    <div className="w-full p-6">
      <PreviousButton />
      <div className="pt-12">
        <Header bold big>
          {MESSAGES.CEREMONY.DETAIL_CONTENT_TITLE}
        </Header>
        <AdminCeremonyDetail ceremonyId={ceremonyId} context="admin" />
      </div>
    </div>
  );
};

export default OccasionRequestDetailPage;
