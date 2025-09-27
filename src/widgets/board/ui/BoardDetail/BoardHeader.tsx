'use client';

import { BoardNotificationToggle } from '@/entities/board';

interface BoardHeaderProps {
  boardName: string;
  isNotificationActive: boolean;
}

export const BoardHeader = ({ boardName, isNotificationActive }: BoardHeaderProps) => {
  return (
    <header className="flex w-full flex-col gap-4 pt-8">
      <div className="flex w-full items-center justify-between px-5">
        <div className="truncate pr-4 text-xl font-bold lg:text-3xl">{boardName}</div>
        <div className="flex items-center gap-2 sm:gap-4">
          <BoardNotificationToggle isNotificationActive={isNotificationActive} />
        </div>
      </div>
    </header>
  );
};
