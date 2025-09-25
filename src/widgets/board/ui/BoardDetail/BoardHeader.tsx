'use client';

import { useState } from 'react';

import { BoardNotificationToggle } from '@/entities/board';
import { SearchBar } from '@/entities/contact';

import { PreviousButton } from '@/shared';

interface BoardHeaderProps {
  boardName: string;
  isNotificationActive: boolean;
}

export const BoardHeader = ({ boardName, isNotificationActive }: BoardHeaderProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <header className="flex w-full flex-col gap-4 pt-3">
      <PreviousButton />

      <div className="flex w-full items-center justify-between px-5">
        <div className="truncate pr-4 text-xl font-bold lg:text-3xl">{boardName}</div>
        <div className="flex items-center gap-2 sm:gap-4">
          <BoardNotificationToggle isNotificationActive={isNotificationActive} />
        </div>
      </div>

      <div className="px-5">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="찾으시는 게시글을 검색해주세요"
          bgColor="bg-white"
          textSize="md:text-base text-sm"
        />
      </div>
    </header>
  );
};
