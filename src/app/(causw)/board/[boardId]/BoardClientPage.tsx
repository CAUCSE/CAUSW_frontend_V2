'use client';

import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

import { BoardHeader, BoardPostList } from '@/fsd_widgets/board';
import { useGetPostList } from '@/fsd_entities/post';
import { LoadingScreen } from '@/fsd_shared';

const PullToRefreshContainer = dynamic(
  () => import('@/fsd_shared').then((mod) => mod.PullToRefreshContainer),
  { ssr: false }
);

export const BoardClientPage = () => {
  const { boardId } = useParams();
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    hasNextPage,
    isError,
    error,
    refetch,
  } = useGetPostList({
    boardId: boardId as string,
  });

  const handleRefresh = async () => {
    await refetch();
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    throw error;
  }

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <BoardHeader
        boardName={data?.boardName!}
        isNotificationActive={data?.isBoardSubscribed!}
        isWritable={data?.writeable!}
      />
      <PullToRefreshContainer onRefresh={handleRefresh}>
        <BoardPostList
          postList={data?.postList!}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      </PullToRefreshContainer>
    </div>
  );
};
