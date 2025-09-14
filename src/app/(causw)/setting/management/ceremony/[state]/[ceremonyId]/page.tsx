'use client';

import { useParams } from 'next/navigation';

import { AdminCeremonyDetail } from '@/widgets/ceremony';

import { Header, MESSAGES, PreviousButton } from '@/shared';

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
