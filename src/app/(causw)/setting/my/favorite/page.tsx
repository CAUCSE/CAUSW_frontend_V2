"use client";

import { API, Icon, PreviousButton } from "@/shared";
import { useEffect, useRef, useState } from "react";

import { AxiosResponse } from "axios";
import Image from "next/image";
import { LoadingComponent } from "@/entities";
import { getTimeDifference } from "@/utils/format";
import { useRouter } from "next/navigation";

const MyFavoritePostsPage = () => {
  const router = useRouter();

  const [posts, setPosts] = useState<Post.PostDto[]>([]);

  const [initialLoading, setInitialLoading] = useState(true);

  const lastPostElementRef = useRef(null);

  const URI = "/api/v1/users";
  const getMyFavoritePosts = async () => {
    const { data } = (await API.get(
      `${URI}/posts/favorite`,
    )) as AxiosResponse<Setting.GetMyPostsResponseDto>;

    return data.posts.content;
  };

  useEffect(() => {
    getMyFavoritePosts()
      .then((res) => {
        setPosts(res);
      })
      .then(() => {
        setInitialLoading(false);
      });
  }, []);

  return (
    <div className="h-full w-full">
      {initialLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="flex h-24 w-full items-end px-5 sm:px-10">
            <PreviousButton />

            <div className="z-10 flex w-full items-center justify-between">
              <div className="truncate pr-4 text-xl font-bold lg:text-3xl">
                내가 찜한 게시글
              </div>
            </div>
          </div>

          <div className="absolute top-28 flex h-[calc(100%-7rem)] w-full flex-col gap-4 overflow-y-auto px-[5px] sm:top-28 sm:h-[calc(100%-8rem)]">
            {posts.length === 0 ? (
              <div className="flex h-full w-full items-center justify-center text-2xl">
                작성하신 게시글이 없습니다.
              </div>
            ) : (
              <>
                {posts
                  .filter((post) => !post.isDeleted)
                  .map((content, idx: number) => (
                    <div
                      key={idx}
                      ref={idx === posts.length - 1 ? lastPostElementRef : null}
                      className="flex w-full items-center rounded-xl bg-white p-4 shadow-lg lg:p-6"
                      onClick={() => {
                        router.push(`/board/my/${content.id}`);
                      }}
                    >
                      <div className="flex w-full flex-col">
                        <div className="flex w-full items-center justify-between">
                          <div className="flex w-2/3 flex-col">
                            <div className="flex-auto truncate">
                              <p className="overflow-hidden text-ellipsis whitespace-nowrap pb-2 text-sm font-bold md:text-2xl">
                                {content.title}
                              </p>
                            </div>

                            {/* todo content도 2줄 정도만 미리 보이게 하기 */}
                            <div className="md:text-md pb-2 text-sm">
                              {content.content ? (
                                content.content
                                  .split("\n")
                                  .slice(0, 2)
                                  .map((str, idx) => {
                                    if (
                                      idx === 1 &&
                                      content.content.split("\n").length > 2
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
                                {content.numLike > 999
                                  ? "999+"
                                  : content.numLike}
                              </p>
                            </div>
                            <div className="hidden items-center gap-2 sm:flex">
                              <Icon iconName="scrap" />
                              <p className="text-yellow-500">
                                {content.numFavorite > 999
                                  ? "999+"
                                  : content.numFavorite}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2">
                              <Icon iconName="comment" />
                              <p className="text-blue-300">
                                {content.numComment > 999
                                  ? "999+"
                                  : content.numComment}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 pl-2 lg:pl-4">
                            <Icon iconName="vote_inactive" />
                            <Icon iconName="apply_inactive" />
                          </div>
                          <div className="sm:text-md flex items-center pl-2 text-center text-xs text-gray-300 lg:pl-4">
                            {getTimeDifference(content.createdAt)}
                          </div>
                          <div className="sm:text-md flex items-center pl-2 text-center text-xs text-gray-300 lg:pl-4">
                            {content.isAnonymous ? "익명" : content.writerName}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MyFavoritePostsPage;
