"use client";

import { BoardRscService, PostRscService, usePostListStore } from "@/shared";
import { LoadingComponent, PostList, PostListHeader } from "@/entities";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// TODO 게시판 ID로 게시물 목록 조회 API 연동 필요
// TODO 알람 설정 API 연동 필요 -> 아

const BoardPage = () => {
  const router = useRouter();
  const params = useParams();
  const { getPostList } = PostRscService();
  const { getBoardNotificationInfo } = BoardRscService();

  const { boardId } = params;

  const {
    page,
    initialLoading,
    notification,
    setPosts,
    setBoardName,
    setInitialLoading,
    setScrollLoading,
    setHasMore,
    setPage,
    setNotification,
  } = usePostListStore();

  const [boardIdValidation, setBoardIdValidation] = useState(true);

  useEffect(() => {
    setPage(0);
    setPosts([]);
  }, []);

  useEffect(() => {
    if (!boardId) return;
    const fetchData = async () => {
      if (page === 0) {
        setInitialLoading(true);
      } else {
        setScrollLoading(true);
      }
      try {
        const [data1, data2]: [Board.BoardWithPostResponseDto, boolean] =
          await Promise.all([
            getPostList(boardId, page),
            getBoardNotificationInfo(boardId),
          ]);
        setPosts((posts) => [...posts, ...data1.post.content]);
        setBoardName(data1.boardName);
        setHasMore(data1.post.totalPages - 1 > page);
        setNotification(data2);
      } catch (error) {
        setBoardIdValidation(false);
      } finally {
        if (page === 0) {
          setInitialLoading(false);
        } else {
          setScrollLoading(false);
        }
      }
    };

    fetchData();
  }, [page]);

  if (!boardIdValidation) {
    router.push("/not-found");
  }

  return (
    <div className="h-full w-full">
      {initialLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <PostListHeader />
          <PostList />
        </>
      )}
    </div>
  );
};

export default BoardPage;
