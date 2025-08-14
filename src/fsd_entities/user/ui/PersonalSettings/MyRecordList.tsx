'use client';

/**
 * MyPageList.tsx
 * - "환경설정"-"기록"-이하 페이지 데이터 리스트
 */
import dynamic from 'next/dynamic';

import { LoadingComponent, useInfiniteScroll } from '@/fsd_shared';

interface MyRecordListProps {
  data: Post.PostResponseDto[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

const PostItem = dynamic(() => import('@/entities').then((mod) => mod.PostItem), {
  ssr: false,
});
const LoadingSpinner = dynamic(() => import('@/fsd_shared').then((mod) => mod.LoadingSpinner), {
  ssr: false,
});

export const MyRecordList = ({
  data: postList,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}: MyRecordListProps) => {
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

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="xs:px-5 mt-4 flex flex-1 flex-col gap-4 overflow-y-auto px-[5px] pb-4 pl-5">
      {postList?.length === 0 ? (
        <div className="flex h-full w-full items-center justify-center text-2xl">게시글이 없습니다.</div>
      ) : (
        <>
          {postList!
            .filter((post) => !post.isDeleted)
            .map((post: Post.PostResponseDto) => (
              <PostItem key={post.id} post={post} targetUrl={`/board/my/${post.id}`} />
            ))}

          {hasNextPage && (
            <div className="min-h-5 w-full" ref={targetRef}>
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
