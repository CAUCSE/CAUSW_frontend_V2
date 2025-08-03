'use client';

import { notFound, useRouter } from 'next/navigation';

import { CommentCardList, CommentInput } from '@/fsd_widgets/comment';
import { PostDetailSection } from '@/fsd_widgets/post';

import { useGetPostDetail } from '@/fsd_entities/post';

import { LoadingScreen, PreviousButton } from '@/fsd_shared';

const PostDetailPage = ({ params }: { params: { boardId: string; postId: string } }) => {
  const { boardId, postId } = params;

  const router = useRouter();
  const { data: postDetail, isLoading: isPostDetailLoading } = useGetPostDetail({ postId });

  const routerCallback = () => {
    if (boardId === 'my' || boardId === 'search') {
      router.back();
      return;
    }
    router.replace(`/board/${boardId}`);
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

      <div className="flex w-full flex-col gap-3 overflow-y-auto px-3">
        <PostDetailSection postData={postDetail} />
        <CommentCardList postId={postId} />
      </div>
      <div className="flex justify-center py-2">
        <CommentInput postId={postId} />
      </div>
    </div>
  );
};
export default PostDetailPage;
