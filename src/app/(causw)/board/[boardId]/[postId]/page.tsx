'use client';

import { notFound, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { PullToRefreshContainer } from '@/fsd_shared';

import { CommentCardList, CommentInput } from '@/fsd_widgets/comment';
import { PostDetailSection } from '@/fsd_widgets/post';

import { useGetPostDetail, postQueryKey } from '@/fsd_entities/post';
import { commentQueryKey } from '@/fsd_entities/comment/config';
import { LoadingScreen, PreviousButton } from '@/fsd_shared';

const PostDetailPage = ({ params }: { params: { boardId: string; postId: string } }) => {
  const { boardId, postId } = params;
  const router = useRouter();

  const queryClient = useQueryClient();
  const { data: postDetail, isLoading: isPostDetailLoading } = useGetPostDetail({ postId });

  const routerCallback = () => {
    if (boardId === 'my' || boardId === 'search') {
      router.back();
      return;
    }
    router.replace(`/board/${boardId}`);
  };

  const handleRefresh = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: postQueryKey.detail({ postId }) }),
      queryClient.invalidateQueries({ queryKey: commentQueryKey.list({ postId }) }),
    ]);
  };

  if (isPostDetailLoading) {
    return <LoadingScreen />;
  }

  if (!postDetail) {
    return notFound();
  }

  return (
    <div className="grid h-full w-full grid-rows-[auto_1fr_auto] pt-3">
      <PreviousButton routeCallback={routerCallback} className="pl-5" />

      <PullToRefreshContainer onRefresh={handleRefresh}>
        <div className="flex w-full flex-col gap-3 overflow-y-auto px-3">
          <PostDetailSection postData={postDetail} />
          <CommentCardList postId={postId} />
        </div>
      </PullToRefreshContainer>

      <div className="flex justify-center py-2">
        <CommentInput postId={postId} />
      </div>
    </div>
  );
};
export default PostDetailPage;
