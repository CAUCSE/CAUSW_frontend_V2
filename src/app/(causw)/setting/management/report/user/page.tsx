'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useReportedUsers } from '@/fsd_entities/report/model/queries/useReportedUsers';

import { PreviousButton } from '@/fsd_shared';

export default function ReportedUserListPage() {
  const router = useRouter();
  const { data: users, isLoading, isError } = useReportedUsers(0);

  const goToDetail = (userId: string) => {
    router.push(`/setting/management/report/user/${userId}`);
  };

  return (
    <div className="relative top-3 left-2 w-[calc(100%-1rem)] md:top-14 md:left-14 md:w-[calc(100%-7rem)]">
      <PreviousButton className="mb-8" />
      <div className="max-w-md px-4">
        <h1 className="my-4 text-xl font-medium md:text-3xl">신고 유저 관리</h1>

        {isLoading && <div className="py-6 text-gray-500">불러오는 중…</div>}
        {isError && <div className="py-6 text-red-500">목록을 불러오지 못했어요.</div>}

        {users?.map((user) => (
          <div
            key={user.id}
            onClick={() => goToDetail(user.id)}
            className="flex cursor-pointer items-center justify-between border-b py-4"
          >
            {/* 왼쪽: 프로필 이미지 + 이름/닉네임 */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                <Image
                  src={user.profileImage || '/images/puang_profile.svg'}
                  alt={`${user.name} 프로필`}
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="font-semibold">{user.name}</div>
                <div className="text-sm text-gray-500">{user.nickname}</div>
              </div>
            </div>

            {/* 오른쪽: 신고 누적 횟수 */}
            <div className="rounded-lg border px-3 py-1 text-sm text-gray-600">신고 누적 {user.totalCount}회</div>
          </div>
        ))}
      </div>
    </div>
  );
}
