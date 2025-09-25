'use client';

import { useState } from 'react';

import toast from 'react-hot-toast';

import { BoardNotificationToggle } from '@/entities/board';
import { SearchBar } from '@/entities/contact';
import { CreatePostButton, SearchPostButton } from '@/entities/post';

import { PreviousButton } from '@/shared';

interface BoardHeaderProps {
  boardName: string;
  isNotificationActive: boolean;
  isWritable: boolean;
}

export const BoardHeader = ({ boardName, isNotificationActive, isWritable }: BoardHeaderProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreatePost = (e: React.MouseEvent) => {
    if (!isWritable) {
      e.preventDefault();
      toast.error('게시글 작성 권한이 없습니다.');
      return;
    }
  };
  return (
    <header className="flex w-full flex-col gap-4 pt-3">
      <PreviousButton />

      <div className="flex w-full items-center justify-between px-5">
        <div className="truncate pr-4 text-xl font-bold lg:text-3xl">{boardName}</div>
        <div className="flex items-center gap-2 sm:gap-4">
          {/* {isWritable && (
            <div className="contents" onClick={handleCreatePost}>
              <CreatePostButton />
            </div>
          )} */}

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
