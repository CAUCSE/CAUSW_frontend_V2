'use client';

import toast from 'react-hot-toast';

import { BoardNotificationToggle } from '@/entities/board';
import { CreatePostButton, SearchPostButton } from '@/entities/post';

import { PreviousButton } from '@/shared';

interface BoardHeaderProps {
  boardName: string;
  isNotificationActive: boolean;
  isWritable: boolean;
}

export const BoardHeader = ({ boardName, isNotificationActive, isWritable }: BoardHeaderProps) => {
  const handleCreatePost = (e: React.MouseEvent) => {
    if (!isWritable) {
      e.preventDefault();
      toast.error('게시글 작성 권한이 없습니다.');
      return;
    }
  };
  return (
    <header className="flex h-24 w-full flex-col gap-2 pt-3">
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
          {/* <SearchPostButton /> */}
        </div>
      </div>
    </header>
  );
};
