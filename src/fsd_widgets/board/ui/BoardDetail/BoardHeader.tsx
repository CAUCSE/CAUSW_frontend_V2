'use client';

import { BoardNotificationToggle } from '@/fsd_entities/board';
import { CreatePostButton, SearchPostButton } from '@/fsd_entities/post';

import { PreviousButton } from '@/fsd_shared';

interface BoardHeaderProps {
  boardName: string;
  isNotificationActive: boolean;
}

export const BoardHeader = ({ boardName, isNotificationActive }: BoardHeaderProps) => {
  return (
    <header className="flex h-24 w-full flex-col gap-2 pt-3">
      <PreviousButton />
      <div className="flex w-full items-center justify-between px-5">
        <div className="truncate pr-4 text-xl font-bold lg:text-3xl">{boardName}</div>
        <div className="flex items-center gap-2 sm:gap-4">
          <CreatePostButton />
          <BoardNotificationToggle isNotificationActive={isNotificationActive} />
          <SearchPostButton />
        </div>
      </div>
    </header>
  );
};
