"use client";

import { LoadingComponent, PostList, PostListHeader } from "@/entities";
import { PostRscService, usePostListStore } from "@/shared";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// TODO 게시판 ID로 게시물 목록 조회 API 연동 필요
// TODO 알람 설정 API 연동 필요 -> 아

const BoardPage = () => {
  const router = useRouter();
  const params = useParams();
  const { getPostList } = PostRscService();

  const { boardId } = params;

  const {
    page,
    initialLoading,
    setIsBoardFavorite,
    setPosts,
    setBoardName,
    setInitialLoading,
    setScrollLoading,
    setHasMore,
    setPage,
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
        const response: Board.BoardWithPostResponseDto = await getPostList(
          boardId,
          page,
        );
        setIsBoardFavorite(response.isFavorite);
        setPosts((posts) => [...posts, ...response.post.content]);
        setBoardName(response.boardName);
        setHasMore(response.post.totalPages - 1 > page);
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

  //TODO 게시판 즐겨찾기 api 추가되면 연동하기
  // useEffect(() => {
  //   const setBoardFavorite = async () => {
  //     await toggleBoardFavorite(boardId, isBoardFavorite);
  //   };
  //   if (loading) return;
  //   setBoardFavorite();
  // }, [isBoardFavorite]);

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
