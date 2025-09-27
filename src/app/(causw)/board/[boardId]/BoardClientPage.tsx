'use client';

import { useState } from 'react';

import { useParams } from 'next/navigation';

import toast from 'react-hot-toast';

import { BoardHeader, BoardPostList } from '@/widgets/board';

import { SearchBar } from '@/entities/contact';
import { useGetPostList } from '@/entities/post';

import { Fab, LoadingScreen, useDebounce } from '@/shared';

export const BoardClientPage = () => {
  const { boardId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, fetchNextPage, isFetchingNextPage, isLoading, hasNextPage, isError, error } = useGetPostList({
    boardId: boardId as string,
    keyword: debouncedSearchTerm,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    throw error;
  }

  const handleCreatePost = (e: React.MouseEvent) => {
    if (!data?.writable) {
      e.preventDefault();
      toast.error('게시글 작성 권한이 없습니다.');
      return;
    }
  };

  return (
    <>
      <div className="flex h-full w-full flex-col gap-4">
        <BoardHeader boardName={data?.boardName!} isNotificationActive={data?.isBoardSubscribed!} />
        <div className="px-5">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="찾으시는 게시글을 검색해주세요"
            bgColor="bg-white"
            textSize="md:text-base text-sm"
          />
        </div>
        <BoardPostList
          postList={data?.postList!}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      </div>
      {data?.writable && (
        <div className="contents" onClick={handleCreatePost}>
          <Fab href={`${boardId}/create`} label="게시글 추가" />
        </div>
      )}
    </>
  );
};
