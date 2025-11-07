'use client';

import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';

import { PostCard } from '@/entities/post';

import { LoadingSpinner, useInfiniteScroll } from '@/shared';

interface BoardPostListProps {
  postList: Post.PostResponseDto[];
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: (options?: FetchNextPageOptions) => Promise<
    InfiniteQueryObserverResult<
      {
        postList: Post.PostResponseDto[];
        boardName: string;
      },
      Error
    >
  >;
}

export const BoardPostList = ({
  postList,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}: BoardPostListProps) => {
  const fetchCallback: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
        observer.unobserve(entry.target);
      }
    });
  };
  const { targetRef } = useInfiniteScroll({
    intersectionCallback: fetchCallback,
  });

  const cardStyles =
    'transition-all duration-200 ease-out will-change-transform rounded-xl ' +
    'hover:-translate-y-0.5 hover:shadow-md hover:bg-white ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ' +
    'motion-reduce:transition-none motion-reduce:hover:translate-y-0';

  return (
    <div className="flex w-full grow flex-col gap-4 overflow-y-auto px-4 pb-2">
      {postList!.length === 0 ? (
        <div className="flex h-full w-full items-center justify-center text-2xl">
          게시글이 없습니다.
        </div>
      ) : (
        <>
          {postList!
            .filter((post) => !post.isDeleted)
            .map((post: Post.PostResponseDto) => (
              <div key={post.id} className={cardStyles}>
                <PostCard post={post} />
              </div>
            ))}

          {hasNextPage && (
            <div className="h-5 w-full" ref={targetRef}>
              {isFetchingNextPage && (
                <div className="pt-5">
                  <LoadingSpinner loading={isFetchingNextPage} size={50} />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
