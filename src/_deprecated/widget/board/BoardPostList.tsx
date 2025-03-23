"use client";

import { Loading, PostService, useInfiniteScroll } from "@/shared";
import { LoadingComponent, PostItem } from "@/_deprecated/entities";
import { notFound, useParams } from "next/navigation";

export const BoardPostList = () => {
  const param = useParams();
  const { boardId } = param;

  const { useGetPostList } = PostService();
  const {
    fetchNextPage,
    data,
    isFetchingNextPage,
    isLoading,
    hasNextPage,
    isError,
  } = useGetPostList(boardId);

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

  if (isError) {
    notFound();
  }

  return (
    <div className="absolute top-28 flex h-[calc(100%-7rem)] w-full flex-col gap-4 overflow-y-auto px-[5px] sm:top-28 sm:h-[calc(100%-8rem)]">
      {data!.length === 0 ? (
        <div className="flex h-full w-full items-center justify-center text-2xl">
          게시글이 없습니다.
        </div>
      ) : (
        <>
          {data!
            .filter((post) => !post.isDeleted)
            .map((post: Post.PostResponseDto) => (
              <PostItem key={post.id} post={post} boardId={boardId as string} />
            ))}

          {hasNextPage && (
            <div className="h-5 w-full" ref={targetRef}>
              {isFetchingNextPage && (
                <div className="pt-5">
                  <Loading loading={isFetchingNextPage} size={50} />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
