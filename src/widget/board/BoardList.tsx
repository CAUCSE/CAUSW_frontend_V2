"use client";

import { CustomBoard, DefaultBoard, LoadingComponent } from "@/entities";

import Link from "next/link";
import { useGetBoardList } from "@/shared";

export const BoardList = () => {
  const { boards, boardInfoMap, loading, roles } = useGetBoardList();

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="absolute h-full w-full py-3">
            <div className="flex flex-col items-center">
              {boards.filter((board) => board.isDefault).length > 0 &&
                (roles.includes("ADMIN") ? (
                  <DefaultBoard
                    boardInfos={boards.filter(
                      (board: Board.BoardResponseDto) => board.isDefault,
                    )}
                  />
                ) : (
                  <DefaultBoard
                    boardInfos={boards.filter(
                      (board: Board.BoardResponseDto) =>
                        board.isDefault &&
                        !boardInfoMap.get(board.boardId)?.isDeleted,
                    )}
                  />
                ))}
              {roles.includes("ADMIN") ? (
                <CustomBoard
                  boardInfos={boards.filter(
                    (board: Board.BoardResponseDto) => !board.isDefault,
                  )}
                />
              ) : (
                <CustomBoard
                  boardInfos={boards.filter(
                    (board: Board.BoardResponseDto) =>
                      !board.isDefault &&
                      !boardInfoMap.get(board.boardId)?.isDeleted,
                  )}
                />
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
