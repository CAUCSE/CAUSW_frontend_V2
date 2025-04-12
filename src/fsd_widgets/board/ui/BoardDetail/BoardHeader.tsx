'use client';

import { usePathname, useRouter } from 'next/navigation';

import { IconButton, PreviousButton } from '@/fsd_shared';

interface BoardHeaderProps {
  boardName: string;
}

export const BoardHeader = ({ boardName }: BoardHeaderProps) => {
  const pathname = usePathname();

  const router = useRouter();

  return (
    <div className="flex h-24 w-full items-end px-5 sm:px-10">
      <PreviousButton />
      <div className="z-10 flex w-full items-center justify-between">
        <div className="truncate pr-4 text-xl font-bold lg:text-3xl">{boardName}</div>
        <div className="flex items-center gap-2 sm:gap-4">
          <IconButton
            iconName={'add'}
            callback={() => {
              router.push(`${pathname}/create`);
            }}
          />
          {/* 게시판 알람 기능 추가 전까지 알람 설정 버튼 삭제
          <IconButton
            iconName={notification ? "alarm_active" : "alarm_inactive"}
            callback={() => setNotification(!notification)}
          /> */}
          <IconButton
            iconName={'search'}
            callback={() => {
              router.push(`${pathname}/search`);
            }}
          />
        </div>
      </div>
    </div>
  );
};
