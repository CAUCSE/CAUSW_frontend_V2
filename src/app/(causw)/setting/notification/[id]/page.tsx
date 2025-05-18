'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { OccasionDetailPage } from '@/fsd_widgets/occasion';

import { Header } from '@/entities';

const OccasionRequestDetailPage = () => {
  const { occasionId } = useParams<{ occasionId: string }>();
  return (
    <div className="relative left-4 top-3 w-[calc(100%-2rem)] md:left-14 md:top-14 md:w-[calc(100%-7rem)]">
      <Link href="/setting/notification" className="mb-7 flex items-center text-lg">
        <span className="icon-[weui--back-filled] mr-6 text-3xl font-bold"></span>
        이전
      </Link>
      <Header bold big>
        경조사 정보
      </Header>

      <OccasionDetailPage occasionId={occasionId} />
    </div>
  );
};

export default OccasionRequestDetailPage;
