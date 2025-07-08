'use client';

import { useGetCommentList } from '@/fsd_entities/comment';

import { LoadingSpinner, useInfiniteScroll } from '@/fsd_shared';

import { ChildCommentCard } from '../ChildCommentCard';
import { CommentCard } from '../CommentCard';

interface CommentCardListProps {
  postId: string;
}

export const CommentCardList = ({ postId }: CommentCardListProps) => {
  const {
    data: commentList,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetCommentList({ postId });

  const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
  };

  const { targetRef } = useInfiniteScroll({ intersectionCallback });

  if (isLoading) {
    return (
      <div className="flex justify-center py-2">
        <LoadingSpinner loading={isLoading} size={20} />
      </div>
    );
  }

  return (
    <div className="pl-4 sm:pt-3">
      {commentList?.map((comment) => {
        return (
          <div key={comment.id}>
            <CommentCard comment={comment} />
            <div className="mb-4 flex flex-col gap-4">
              {comment.childCommentList.map((childComment) => (
                <ChildCommentCard key={childComment.id} childComment={childComment} />
              ))}
            </div>
          </div>
        );
      })}
      {!isFetchingNextPage && hasNextPage && <div ref={targetRef} className="h-[1px]" />}
      {isFetchingNextPage && <LoadingSpinner loading={isFetchingNextPage} size={20} />}
    </div>
  );
};
