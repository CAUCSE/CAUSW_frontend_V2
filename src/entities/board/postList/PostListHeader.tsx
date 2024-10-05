"use client";

import { IconButton, PreviousButton, usePostListStore } from "@/shared";
import { useParams, useRouter } from "next/navigation";

export const PostListHeader = () => {
  const router = useRouter();
  const param = useParams();
  const { boardId } = param;
  const initState = () => {
    setPage(0);
    setPosts([]);
  };
  const { boardName, isBoardFavorite, setIsBoardFavorite, setPage, setPosts } =
    usePostListStore();
  return (
    <div className="flex h-24 w-full items-end px-5 sm:px-10">
      <PreviousButton />
      <div className="z-10 flex w-full items-center justify-between">
        <div className="truncate pr-4 text-xl font-bold lg:text-3xl">
          {boardName}
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          {/* TODO 게시글 생성 페이지로 이동 */}
          <IconButton
            iconName={"add"}
            callback={() => {
              initState();
              router.push(`/board/${boardId}/create`);
            }}
          />
          {/* TODO 게시판 알람 설정 */}
          <IconButton
            iconName={isBoardFavorite ? "alarm_active" : "alarm_inactive"}
            callback={() => setIsBoardFavorite(!isBoardFavorite)}
          />
          <IconButton
            iconName={"search"}
            callback={() => {
              initState();
              router.push(`/board/${boardId}/search`);
            }}
          />
        </div>
      </div>
    </div>
  );
};
