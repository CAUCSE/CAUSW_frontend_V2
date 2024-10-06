"use client";

import { Icon, Loading, usePostListStore } from "@/shared";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Image from "next/image";
import { getTimeDifference } from "@/entities";

export const PostList = () => {
  const router = useRouter();
  const param = useParams();
  const { boardId } = param;
  const { posts, initialLoading, scrollLoading, hasMore, setPage, setPosts } =
    usePostListStore();

  const initState = () => {
    setPage(0);
    setPosts([]);
  };

  const lastPostElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initialLoading || scrollLoading || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !initialLoading) {
          setPage((page) => page + 1);
        }
      },
      { threshold: 0.1 },
    );

    if (lastPostElementRef.current) {
      observer.observe(lastPostElementRef.current);
    }

    return () => {
      if (lastPostElementRef.current) {
        observer.unobserve(lastPostElementRef.current);
      }
    };
  }, [initialLoading, scrollLoading, hasMore]);

  return (
    <div className="absolute top-28 flex h-[calc(100%-7rem)] w-full flex-col gap-4 overflow-y-auto px-[5px] sm:top-28 sm:h-[calc(100%-8rem)]">
      {posts.length === 0 ? (
        <div className="flex h-full w-full items-center justify-center text-2xl">
          게시글이 없습니다.
        </div>
      ) : (
        <>
          {posts
            .filter((post) => !post.isDeleted)
            .map((post: Post.PostResponseDto, idx: number) => (
              <div
                key={post.id}
                ref={
                  idx === posts.filter((post) => !post.isDeleted).length - 1
                    ? lastPostElementRef
                    : null
                }
                className="flex w-full items-center rounded-xl bg-white p-4 shadow-lg lg:p-6"
                onClick={() => {
                  initState();
                  router.push(`/board/${boardId}/${post.id}`);
                }}
              >
                <div className="flex w-full flex-col">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex w-2/3 flex-col">
                      <div className="flex-auto truncate">
                        <p className="overflow-hidden text-ellipsis whitespace-nowrap pb-2 text-sm font-bold md:text-2xl">
                          {post.title}
                        </p>
                      </div>

                      {/* todo content도 2줄 정도만 미리 보이게 하기 */}
                      <div className="md:text-md pb-2 text-sm">
                        {post.content ? (
                          post.content
                            .split("\n")
                            .slice(0, 2)
                            .map((str, idx) => {
                              if (
                                idx === 1 &&
                                post.content.split("\n").length > 2
                              ) {
                                return <p key={idx}>{str}...</p>;
                              }
                              return <p key={idx}>{str}</p>;
                            })
                        ) : (
                          <p></p>
                        )}
                      </div>
                    </div>
                    <div className="h-16 w-16 flex-shrink-0 sm:h-24 sm:w-24">
                      <Image
                        src="/images/post_default_thumbnail.png"
                        alt="default_thumbnail"
                        width={100}
                        height={100}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 divide-x-2 sm:gap-4">
                    <div className="flex gap-2 lg:gap-4">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Icon iconName="like" />
                        <p className="text-red-500">
                          {post.numLike > 999 ? "999+" : post.numLike}
                        </p>
                      </div>
                      <div className="hidden items-center gap-2 sm:flex">
                        <Icon iconName="scrap" />
                        <p className="text-yellow-500">
                          {post.numFavorite > 999 ? "999+" : post.numFavorite}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Icon iconName="comment" />
                        <p className="text-blue-300">
                          {post.numComment > 999 ? "999+" : post.numComment}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pl-2 lg:pl-4">
                      <Icon
                        iconName={
                          post.isPostVote ? "vote_active" : "vote_inactive"
                        }
                      />
                      <Icon
                        iconName={
                          post.isPostForm ? "apply_active" : "apply_inactive"
                        }
                      />
                    </div>
                    <div className="sm:text-md flex items-center pl-2 text-center text-xs text-gray-300 lg:pl-4">
                      {getTimeDifference(post.createdAt)}
                    </div>
                    <div className="sm:text-md flex items-center pl-2 text-center text-xs text-gray-300 lg:pl-4">
                      {post.isAnonymous ? "익명" : post.writerName}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {scrollLoading && (
            <div className="pt-5">
              <Loading loading={scrollLoading} size={50} />
            </div>
          )}
        </>
      )}
    </div>
  );
};
