"use client";

import { BoardRscService, Icon, Loading, PreviousButton } from "@/shared";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from "react-hook-form";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LoadingComponent } from "@/entities";

interface IFormInput {
  searchContent: string;
}

interface IContent {
  createdAt: string;
  id: string;
  content: string;
  isAnonymous: boolean;
  isDeleted: boolean;
  isQuestion: boolean;
  numComment: number;
  numFavorite: number;
  numLike: number;
  title: string;
  updatedAt: Date;
  writerAdmissionYear: number;
  writerName: string;
}

interface IPost {
  content: Array<IContent>;
  totalPages: number;
}

interface IBoard {
  boardId: "string";
  boardName: "string";
  isFavorite: "false";
  post: IPost;
  writeable: "true";
}

const ModalContent = () => (
  <div className="flex flex-col items-center">
    <h1 className="pb-10 text-lg font-bold md:text-xl">
      이미 존재하는 게시판 이름
    </h1>
    <p className="text-center">동일한 이름의 게시판이 이미 존재합니다.</p>
    <p className="pb-10 text-center">다른 이름을 입력해주세요</p>
  </div>
);

const getTimeDifference = (ISOtime: string) => {
  const createdTime = new Date(ISOtime);
  const now = new Date();
  const diffMSec = now.getTime() - createdTime.getTime();
  const diffMin = Math.round(diffMSec / (60 * 1000));
  if (diffMin === 0) {
    return `방금 전`;
  } else if (diffMin < 60) {
    return `${diffMin}분 전`;
  } else if (
    now.getFullYear() === createdTime.getFullYear() &&
    now.getMonth() === createdTime.getMonth() &&
    now.getDate() === createdTime.getDate()
  ) {
    return `${createdTime.getHours()}:${createdTime.getMinutes()}`;
  } else if (now.getFullYear() === createdTime.getFullYear()) {
    return `${createdTime.getMonth() + 1}/${createdTime.getDate()}`;
  } else {
    return `${now.getFullYear() - createdTime.getFullYear()}년 전`;
  }
};

const SearchPost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const pathName = usePathname();
  const path = pathName.split("/");
  const boardId = path[path.length - 2];

  const { searchPost } = BoardRscService();

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [isSearch, setIsSearch] = useState(false);
  const [keyword, setKeyword] = useState("");

  const [searchLoading, setSearchLoading] = useState(false);
  const [scrollLoading, setScrollLoading] = useState(false);

  const [hasMore, setHasMore] = useState(true);
  const lastPostElementRef = useRef(null);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    //TODO 검색 api 연동
    setIsSearch(true);
    setPosts([]);
    setPage(0);
    setKeyword(() => data.searchContent);
    try {
      setSearchLoading(true);
      const response = await searchPost(boardId, keyword, page);
      setPosts((prev) => [...prev, ...response.post.content]);
      setHasMore(response.post.totalPages - 1 > page);

      setSearchLoading(false);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setScrollLoading(true);
        const response = await searchPost(boardId, keyword, page);
        setPosts((prev) => [...prev, ...response.post.content]);
        setHasMore(response.post.totalPages - 1 > page);
      } catch (error) {
        throw error;
      } finally {
        setScrollLoading(false);
      }
    };
    fetchData();
  }, [page]);

  useEffect(() => {
    if (scrollLoading || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !searchLoading) {
          setPage((prevPage) => prevPage + 1);
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
  }, [searchLoading, hasMore]);

  return (
    <div className="bottom-0 top-0 h-full w-full bg-boardPageBackground p-5">
      <div className="flex h-full w-full flex-col items-center gap-[20px]">
        <div className="h-[50px] w-full bg-[#F8F8F8]">
          <PreviousButton />
        </div>

        <div className="h-full w-full overflow-y-auto p-4">
          {isSearch ? (
            <>
              <div className="h-full w-full">
                {searchLoading ? (
                  <LoadingComponent />
                ) : (
                  <>
                    <div className="flex flex-col gap-4">
                      {posts.map((content: IContent, idx: number) => (
                        <div
                          key={idx}
                          ref={
                            idx === posts.length - 1 ? lastPostElementRef : null
                          }
                          className="flex w-full items-center rounded-xl bg-white p-4 shadow-lg lg:p-6"
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
                                    {content.numFavorite > 999
                                      ? "999+"
                                      : content.numFavorite}
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
                                {content.isAnonymous
                                  ? "익명"
                                  : content.writerName}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {scrollLoading && (
                      <div className="pt-5">
                        <Loading loading={scrollLoading} size={50} />
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4">
              <Image
                src="/images/search_bg.png"
                alt="검색화면배경사진"
                width={150}
                height={150}
              />
              <p className="text-2xl">게시물을 검색해주세요 !</p>
            </div>
          )}
        </div>

        <div className="flex h-14 w-full justify-center">
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="flex h-full w-full justify-between gap-4 lg:w-3/4"
          >
            <input
              className="h-full w-full rounded-3xl border border-black text-center"
              type="text"
              {...register("searchContent", { required: true })}
              id="searchContent"
              placeholder="글 제목, 내용, 해시태그"
            />

            <button
              className="w-36 rounded-3xl bg-red-500 text-white"
              type="submit"
            >
              검색
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchPost;
