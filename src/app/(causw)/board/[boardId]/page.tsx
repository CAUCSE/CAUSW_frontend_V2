"use client";

import { notFound, usePathname } from "next/navigation";

import { PreviousButton } from "@/shared";
import { title } from "process";

/**
 *
 * @todo boardId가 유효한지 검사 후 유효하지 않다면 error 페이지로 리다이렉션
 * @todo boardId로 게시물 목록 받아오기
 */

// "boardName" : "서비스 공지",
// "posts" : [
//    {
//       "title": 게시글 제목", (String)
//       "content": "게시글 내용", (Stting)
//       "likeCount:" : 좋아요 개수 (Integer),
//       "commentCount": 댓글 개수 (Integer),
//       "isVote": true of false,
//       "isApply": true of false,
//       "createdTime" : 25분전 / 12:34 / 03/07 (String),
//       "author": "만든 사람" (String)
//    },
//    {
//       "title": 게시글 제목", (String)
//       "content": "게시글 내용", (Stting)
//       "likeCount:" : 좋아요 개수 (Integer),
//       "commentCount": 댓글 개수 (Integer),
//       "isVote": true of false,
//       "isApply": true of false,
//       "createdTime" : 25분전 / 12:34 / 03/07 (String),
//       "author": "만든 사람" (String)
//    },
// ]

//TODO 찜 수

const boardInfos = [
  {
    boardId: "1",
    emoji: "❗",
    boardName: "서비스 공지",
    posts: [
      {
        postId: "4",
        title: "서버 점검 18:00 ~ 21:00",
        content: "금일 서버 점검이 18:00 ~ 21:00 사이에 있을 예정입니다.",
        likeCount: 20,
        commentCount: 10,
        isVote: false,
        isApply: false,
        createTime: "2024-08-14T08:30:00.000Z",
        author: "관리자",
      },
      {
        postId: "3",
        title: "서버 점검 20:00 ~ 21:00",
        content: "금일 서버 점검이 20:00 ~ 21:00 사이에 있을 예정입니다.",
        likeCount: 1234,
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
        likeCount: 199,
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
    emoji: "❗",
    boardName: "서비스 공지123123",
    posts: [
      {
        postId: "4",
        title: "서버 점검 18:00 ~ 21:00",
        content: "금일 서버 점검이 18:00 ~ 21:00 사이에 있을 예정입니다.",
        likeCount: 20,
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

const BoardPage = () => {
  const pathName = usePathname();

  //TODO API 연동 필요

  const boardId = pathName.split("/").pop();
  if (!checkBoardValidation(boardId)) {
    notFound();
  }

  const boardInfo = boardInfos.filter((board) => board.boardId === boardId)[0];
  //TODO 이모지 아이콘으로 변경해야 함
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
              <button className="w-8 rounded-xl border border-black">➕</button>
              <button className="w-8 rounded-xl border border-black">🔔</button>
              <button className="w-8 rounded-xl border border-black">🔍</button>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            {boardInfo.posts.map((post, idx) => {
              return (
                <div className="border-black-100 rounded-2xl border bg-white p-5 shadow-lg">
                  <h1 className="pb-5 text-2xl font-bold">{post.title}</h1>
                  <p className="truncate pb-5">{post.content}</p>
                  <div className="flex gap-3 divide-x-2">
                    <div className="flex w-1/3 justify-between">
                      <div className="text-red-500">
                        👍{post.likeCount > 999 ? "999+" : post.likeCount}
                      </div>
                      <div className="text-yellow-500">
                        {/** 즐겨찾기 수 추가해야함*/}⭐
                        {post.likeCount > 999 ? "999+" : post.likeCount}
                      </div>
                      <div className="text-blue-500">
                        💬{post.commentCount > 999 ? "999+" : post.commentCount}
                      </div>
                    </div>
                    <div className="pl-4">투표, 신청서</div>
                    <div className="pl-4">{post.createTime}</div>
                    <div className="pl-4">{post.author}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full"></div>
      </div>
    </div>
  );
};

export default BoardPage;
