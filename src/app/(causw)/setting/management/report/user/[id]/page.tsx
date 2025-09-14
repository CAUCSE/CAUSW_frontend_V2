'use client';

import { useParams } from 'next/navigation';

import { UserReportWidget } from '@/fsd_widgets/report/ui/UserReportWidget';

import { useUserInfo } from '@/entities/user';

import { PreviousButton } from '@/shared';

export default function ReportContentPage() {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading } = useUserInfo(id);

  return (
    <div className="relative top-3 left-2 w-[calc(100%-1rem)] md:top-14 md:left-14 md:w-[calc(100%-7rem)]">
      <PreviousButton className="mb-8" />
      <h1 className="my-4 px-4 text-xl font-bold md:text-3xl">
        {isLoading ? '로딩 중...' : `${user?.name ?? '알 수 없는 유저'}(${user?.studentId ?? ''})`}의 신고된 콘텐츠
      </h1>
      <UserReportWidget />
    </div>
  );
}
