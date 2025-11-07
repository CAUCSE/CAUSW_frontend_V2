'use client';

import { useMemo, useState } from 'react';

import { useParams, useSearchParams } from 'next/navigation';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReportList, ReportTabs } from '@/widgets/report';
import { RemoveMemberDialog } from '@/widgets/report/ui/RemoveMemberDialog';

import { useReportedUsers, useUserReportedList } from '@/entities/report';

export function UserReportWidget() {
  const [client] = useState(() => new QueryClient());
  const { id } = useParams<{ id: string }>();
  const type = (useSearchParams().get('type') ?? 'post') as 'post' | 'comment';
  const pageNum = 0;

  const queryResult = useUserReportedList(type, id, pageNum);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: users } = useReportedUsers(0);

  const currentUser = useMemo(
    () => users?.find((u) => u.id === id),
    [users, id],
  );

  return (
    <QueryClientProvider client={client}>
      <div className="min-h-screen pb-24">
        <ReportTabs />
        <ReportList {...queryResult} />

        {/* 추방 버튼 */}
        {currentUser &&
          currentUser.userState !== 'INACTIVE' &&
          currentUser.userState !== 'DROP' && (
            <div className="fixed right-6 bottom-24 xl:right-96 xl:bottom-10">
              <button
                onClick={() => setIsDialogOpen(true)}
                className="h-16 w-24 rounded-lg bg-red-500 font-bold text-white shadow-lg hover:bg-red-600"
              >
                추방
              </button>
            </div>
          )}

        {/* 추방 모달 */}
        <RemoveMemberDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          userId={id}
          defaultReasonPlaceholder="추방 사유를 입력하세요"
          submitLabel="추방하기"
        />
      </div>
    </QueryClientProvider>
  );
}
