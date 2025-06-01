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
    <div className="flex h-24 w-full items-end px-5 sm:px-10">
      <PreviousButton />
      <div className="z-10 flex w-full items-center justify-between">
        <div className="truncate pr-4 text-xl font-bold lg:text-3xl">{boardName}</div>
        <div className="flex items-center gap-2 sm:gap-4">
          <CreatePostButton />
          <BoardNotificationToggle isNotificationActive={isNotificationActive} />
          <SearchPostButton />
        </div>
      </div>
    </div>
  );
};
