"use client";

import {
  BoardRscService,
  IconButton,
  PreviousButton,
  usePostListStore,
} from "@/shared";
import { useParams, useRouter } from "next/navigation";

import { useEffect } from "react";

export const PostListHeader = () => {
  const router = useRouter();
  const param = useParams();
  const { boardId } = param;
  const initState = () => {
    setPage(0);
    setPosts([]);
  };
  const { boardName, notification, setPage, setPosts, setNotification } =
    usePostListStore();
  const { setBoardNotification } = BoardRscService();

  useEffect(() => {
    const toggleNotification = async () => {
      try {
        await setBoardNotification(boardId);
      } catch (error) {
        throw error;
      }
    };
    toggleNotification();
  }, [notification]);

  return (
    <div className="flex h-24 w-full items-end px-5 sm:px-10">
      <PreviousButton />
      <div className="z-10 flex w-full items-center justify-between">
        <div className="truncate pr-4 text-xl font-bold lg:text-3xl">
          {boardName}
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <IconButton
            iconName={"add"}
            callback={() => {
              initState();
              router.push(`/board/${boardId}/create`);
            }}
          />
          <IconButton
            iconName={notification ? "alarm_active" : "alarm_inactive"}
            callback={() => setNotification(!notification)}
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
