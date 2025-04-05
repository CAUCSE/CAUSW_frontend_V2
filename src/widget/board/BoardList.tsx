'use client';

import Link from 'next/link';

import { CustomBoard, DefaultBoard, LoadingComponent } from '@/entities';
import { useGetBoardList } from '@/shared';

export const BoardList = () => {
  const { boards, boardInfoMap, loading, roles } = useGetBoardList();

  const priorityOrder = ['서비스 공지', '학생회 공지', '소프트웨어학부 학부 공지', '동문회 공지', '딜리버드'];

  // 우선순위 보드를 맨 앞에 배치하고 나머지는 기존 순서 유지
  const sortedBoards = [
    ...boards
      .filter(board => priorityOrder.includes(board.boardName))
      .sort((a, b) => priorityOrder.indexOf(a.boardName) - priorityOrder.indexOf(b.boardName)), // 순서 유지
    ...boards.filter(board => !priorityOrder.includes(board.boardName)), // 나머지 보드 추가
  ];

  const defaultBoardForAdmin = sortedBoards.filter(board => board.isDefault);
  const defaultBoardForCommon = sortedBoards.filter(
    board => board.isDefault && !boardInfoMap.get(board.boardId)?.isDeleted,
  );

  const customBoardForAdmin = sortedBoards.filter(board => !board.isDefault);
  const customBoardForCommon = sortedBoards.filter(
    board => !board.isDefault && !boardInfoMap.get(board.boardId)?.isDeleted,
  );

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="absolute h-full w-full py-3">
            <div className="flex flex-col items-center">
              {sortedBoards.filter(board => board.isDefault).length > 0 &&
                (roles.includes('ADMIN') ? (
                  <DefaultBoard boardInfos={defaultBoardForAdmin} />
                ) : (
                  <DefaultBoard boardInfos={defaultBoardForCommon} />
                ))}
              {roles.includes('ADMIN') ? (
                <CustomBoard boardInfos={customBoardForAdmin} />
              ) : (
                <CustomBoard boardInfos={customBoardForCommon} />
              )}
            </div>
          </div>
          <Link href={`/board/create`}>
            <button className="fixed bottom-[70px] right-[9px] w-32 transform rounded-xl bg-red-500 px-6 py-3 font-bold text-white shadow-lg xl:bottom-10 xl:left-1/2 xl:-translate-x-1/2">
              게시판 생성
            </button>
          </Link>
        </>
      )}
    </>
  );
};
