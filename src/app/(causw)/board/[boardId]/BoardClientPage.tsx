'use client';

import { useParams } from 'next/navigation';

import { BoardHeader, BoardPostList } from '@/fsd_widgets/board';

import { useGetPostList } from '@/fsd_entities/post';

import { LoadingScreen } from '@/fsd_shared';

export const BoardClientPage = () => {
  const { boardId } = useParams();

  const { data, fetchNextPage, isFetchingNextPage, isLoading, hasNextPage, isError, error } = useGetPostList({
    boardId: boardId as string,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    throw error;
  }

  return (
    <div className="h-full w-full">
      <BoardHeader boardName={data?.boardName!} isNotificationActive={data?.isBoardSubscribed!} />
      <BoardPostList
        postList={data?.postList!}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
};
