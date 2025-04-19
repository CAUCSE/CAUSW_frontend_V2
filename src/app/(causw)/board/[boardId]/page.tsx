import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getPostListServer, postQueryKey } from '@/fsd_entities/post';

import { BoardPage } from './BoardPage';

const BoardPageServer = async ({ params }: { params: { boardId: string } }) => {
  const queryClient = new QueryClient();
  const { boardId } = params;
  await queryClient.prefetchInfiniteQuery({
    queryKey: postQueryKey.list(boardId),
    queryFn: async ({ pageParam = 0 }) => await getPostListServer(boardId, pageParam),
    initialPageParam: 0,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BoardPage />
    </HydrationBoundary>
  );
};

export default BoardPageServer;
