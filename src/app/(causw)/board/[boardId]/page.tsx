"use client";

import { BoardListRscService, Icon, PreviousButton } from "@/shared";
import { notFound, usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";

// TODO 게시판 ID로 게시물 목록 조회 API 연동 필요
// TODO 알람 설정 API 연동 필요 -> 아

interface IContent {
  createdAt: string;
  id: string;
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

const IconButton = (iconName: any, callback: any) => (
  <button
    className="flex h-6 w-8 items-center justify-center rounded-3xl border border-black sm:h-8 sm:w-10"
    onClick={callback}
  >
    <Icon iconName={iconName} />
  </button>
);

const BoardPage = () => {
  const pathName = usePathname();
  const boardId = pathName.split("/").pop();

  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [boardName, setBoarName] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const lastPostElementRef = useRef(null);

  const [boardInfo, setBoardInfo] = useState<IBoard | null>(null);
  const [boardIdValidation, setBoardIdValidation] = useState(true);
  useEffect(() => {
    if (!boardId) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const { getBoardList } = BoardListRscService();
        const response = await getBoardList(boardId, page);
        setPosts((prev) => [...prev, ...response.post.content]);
        setBoarName(() => response.boardName);
        setHasMore(response.post.totalPages - 1 > page);
        setLoading(false);

        setBoardInfo(response);
      } catch (error) {
        setBoardIdValidation(false);
        setLoading(false);
      }
    };

    fetchData();
  }, [boardId, page]);

  if (!boardIdValidation) {
    notFound();
  }
  useEffect(() => {
    if (loading || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
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
  }, [loading, hasMore]);

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="fixed flex h-24 w-full items-end justify-between bg-[#F8F8F8] px-2 pb-2 sm:h-28 sm:px-10 sm:pb-2 lg:w-[calc(100%-29rem)]">
        <PreviousButton />
        <div className="text-xl font-bold lg:text-3xl">{boardName}</div>
        <div className="flex items-center gap-2 sm:gap-4">
          {/* TODO 게시글 생성 페이지로 이동 */}
          {IconButton("add", () => {})}
          {/* TODO 게시판 알람 설정 */}
          {IconButton("alarm_inactive", () => {})}
          {/* TODO 게시판 이동 페이지 */}
          {IconButton("search", () => {
            router.push(`/board/${boardId}/search`);
          })}
        </div>
      </div>
      <div className="absolute top-24 h-[calc(100%-6rem)] w-full overflow-y-auto px-2 sm:top-28 sm:h-[calc(100%-8rem)] sm:py-6 lg:px-10">
        {posts.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center text-2xl">
            게시글이 없습니다.
          </div>
        ) : (
          posts.map((content: IContent, idx: number) => (
            <div
              key={idx}
              ref={idx === posts.length - 1 ? lastPostElementRef : null}
              className="my-6 flex w-full items-center rounded-xl bg-white p-4 shadow-lg lg:my-10 lg:p-6"
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
                      <p>게시글 내용입니다</p>
                      <p>게시글 내용입니다</p>
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
                        {content.numLike > 999 ? "999+" : content.numLike}
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
                    {content.isAnonymous ? "익명" : content.writerName}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BoardPage;
