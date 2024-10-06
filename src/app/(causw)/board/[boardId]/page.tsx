"use client";

import { LoadingComponent, PostList, PostListHeader } from "@/entities";
import { PostRscService, usePostListStore } from "@/shared";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const BoardPage = () => {
  const router = useRouter();
  const params = useParams();
  const { getPostList } = PostRscService();

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
        const data1: Board.BoardWithPostResponseDto = await getPostList(
          boardId,
          page,
        );
        setPosts((posts) => [...posts, ...data1.post.content]);
        setBoardName(data1.boardName);
        setHasMore(data1.post.totalPages - 1 > page);
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
