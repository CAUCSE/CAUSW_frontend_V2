"use client";

import { Icon, PreviousButton } from "@/shared";
import { notFound, usePathname, useRouter } from "next/navigation";

import Image from "next/image";
import { useState } from "react";

// TODO 게시판 ID로 게시물 목록 조회 API 연동 필요
// TODO 알람 설정 API 연동 필요 -> 아
const boardInfos = [
  {
    boardId: "1",
    emoji: "❗",
    boardName: "서비스 공지",
    alarmActivation: false,
    posts: [
      {
        postId: "5",
        title: "서버 점검 18:00 ~ 21:00",
        content:
          "금일 서버 점검이 18:00 ~ 21:00 사이에 있을 예정입니다.\n점검이 더 길어질 수도 있습니다.",
        likeCount: 20,
        scrapCount: 30,
        commentCount: 10,
        isVote: true,
        isApply: false,
        createTime: "2024-08-15T15:34:00.000Z",
        author: "관리자",
      },
      {
        postId: "4",
        title: "서버 점검 18:00 ~ 21:00",
        content:
          "금일 서버 점검이 18:00 ~ 21:00 사이에 있을 예정입니다.\n점검이 더 길어질 수도 있습니다.",
        likeCount: 20,
        scrapCount: 30,
        commentCount: 10,
        isVote: true,
        isApply: false,
        createTime: "2024-08-15T15:34:00.000Z",
        author: "관리자",
      },
      {
        postId: "3",
        title: "서버 점검 20:00 ~ 21:00",
        content: "금일 서버 점검이 20:00 ~ 21:00 사이에 있을 예정입니다.",
        likeCount: 1234,
        scrapCount: 9999,
        commentCount: 10000,
        isVote: false,
        isApply: false,
        createTime: "2024-08-15T04:33:00.000Z",
        author: "관리자",
      },
      {
        postId: "2",
        title: "서버 점검 18:00 ~ 21:00",
        content: "금일 서버 점검이 18:00 ~ 21:00 사이에 있을 예정입니다.",
        likeCount: 199,
        scrapCount: 30,
        commentCount: 10,
        isVote: false,
        isApply: false,
        createTime: "2024-08-12T08:30:00.000Z",
        author: "관리자",
      },
      {
        postId: "1",
        title: "서버 점검 18:00 ~ 21:00",
        content: "금일 서버 점검이 18:00 ~ 21:00 사이에 있을 예정입니다.",
        likeCount: 123,
        scrapCount: 30,
        commentCount: 10,
        isVote: false,
        isApply: false,
        createTime: "2024-08-11T08:30:00.000Z",
        author: "관리자",
      },
    ],
  },
  {
    boardId: "2",
    emoji: "🏆",
    boardName: "학생회 공지 게시판",
    alarmActivation: true,
    posts: [
      {
        postId: "4",
        title: "서버 점검 18:00 ~ 21:00",
        content: "금일 서버 점검이 18:00 ~ 21:00 사이에 있을 예정입니다.",
        likeCount: 20,
        scrapCount: 30,
        commentCount: 10,
        isVote: false,
        isApply: false,
        createTime: "2024-08-14T08:30:00.000Z",
        author: "관리자",
      },
      {
        postId: "3",
        title: "서버 점검 18:00 ~ 21:00",
        content: "금일 서버 점검이 18:00 ~ 21:00 사이에 있을 예정입니다.",
        likeCount: 2,
        scrapCount: 30,
        commentCount: 10,
        isVote: false,
        isApply: false,
        createTime: "2024-08-13T08:30:00.000Z",
        author: "관리자",
      },
      {
        postId: "2",
        title: "서버 점검 18:00 ~ 21:00",
        content: "금일 서버 점검이 18:00 ~ 21:00 사이에 있을 예정입니다.",
        likeCount: 10,
        scrapCount: 30,
        commentCount: 10,
        isVote: false,
        isApply: false,
        createTime: "2024-08-12T08:30:00.000Z",
        author: "관리자",
      },
      {
        postId: "1",
        title: "서버 점검 18:00 ~ 21:00",
        content: "금일 서버 점검이 18:00 ~ 21:00 사이에 있을 예정입니다.",
        likeCount: 200,
        scrapCount: 30,
        commentCount: 10,
        isVote: false,
        isApply: false,
        createTime: "2024-08-11T08:30:00.000Z",
        author: "관리자",
      },
    ],
  },
];

const checkBoardValidation = (boardId: string | undefined) => {
  const arr = boardInfos.filter((boardInfo) => boardInfo.boardId === boardId);
  return arr.length > 0;
};

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

const BoardPage = () => {
  const pathName = usePathname();
  const router = useRouter();

  const boardId = pathName.split("/").pop();
  if (!checkBoardValidation(boardId)) {
    notFound();
  }

  const boardInfo = boardInfos.filter((board) => board.boardId === boardId)[0];

  const [alarmActivation, setAlarmActivation] = useState(
    boardInfo.alarmActivation,
  );

  return (
    <div className="absolute bottom-24 top-28 w-full overflow-y-auto bg-boardPageBackground p-5 scrollbar-hide md:bottom-0 md:left-40 md:right-72 md:top-0 md:w-auto">
      <div className="h-full w-full flex-col items-center">
        <PreviousButton />
        <div className="flex w-full flex-col">
          <div className="flex w-full justify-between pb-5 pt-10">
            <div className="left-5">
              <h1 className="truncate text-xl font-semibold">
                {boardInfo.emoji}
                <span className="underline">{boardInfo.boardName}</span>
              </h1>
            </div>
            <div className="right-5 flex gap-2">
              <button className="flex w-8 items-center justify-center rounded-xl border border-black">
                <Icon iconName="add" />
              </button>
              <button
                className="flex w-8 items-center justify-center rounded-xl border border-black"
                onClick={() => setAlarmActivation(!alarmActivation)}
              >
                <Icon
                  iconName={alarmActivation ? "alarm_active" : "alarm_inactive"}
                />
              </button>
              <button
                className="flex w-8 items-center justify-center rounded-xl border border-black"
                onClick={() => router.push(`/board/${boardId}/search`)}
              >
                <Icon iconName="search" />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            {boardInfo.posts.map((post, idx) => {
              return (
                <div
                  className="border-black-100 flex w-full rounded-3xl border bg-white p-5 shadow-lg"
                  key={idx}
                >
                  <div className="flex w-full flex-col justify-between">
                    <h1 className="pb-2 text-2xl font-bold">{post.title}</h1>
                    <div>
                      {post.content
                        .split("\n")
                        .filter((str) => str !== "")
                        .map((str, idx) => (
                          <p className="truncate" key={idx}>
                            {str}
                          </p>
                        ))}
                    </div>
                    <div className="flex gap-3 divide-x-2">
                      <div className="flex gap-2">
                        <div className="flex items-center gap-2">
                          <Icon iconName="like" />
                          <p className="text-md text-red-500">
                            {post.likeCount > 999 ? "999+" : post.likeCount}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon iconName="scrap" />
                          <p className="text-md text-yellow-500">
                            {post.scrapCount > 999 ? "999+" : post.scrapCount}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon iconName="comment" />
                          <p className="text-md text-blue-500">
                            {post.commentCount > 999
                              ? "999+"
                              : post.commentCount}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pl-3">
                        <Icon
                          iconName={
                            post.isVote ? "vote_active" : "vote_inactive"
                          }
                        />
                        <Icon
                          iconName={
                            post.isApply ? "apply_active" : "apply_inactive"
                          }
                        />
                      </div>
                      <div className="pl-3">
                        <p className="opacity-40">
                          {getTimeDifference(post.createTime)}
                        </p>
                      </div>
                      <div className="pl-3">
                        <p className="opacity-40">{post.author}</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative lg:h-36 lg:w-36">
                    <Image
                      src="/images/post_default_thumbnail.png"
                      alt="thumbnail"
                      fill={true}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
