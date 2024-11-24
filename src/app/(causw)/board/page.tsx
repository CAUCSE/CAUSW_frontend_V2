"use client";

import { BoardRscService, useUserStore } from "@/shared";
import { CustomBoard, DefaultBoard, LoadingComponent } from "@/entities";
import { useEffect, useState } from "react";

import Link from "next/link";

const BoardPage = () => {
  const { roles } = useUserStore();
  const { getMainBoardList, getBoardInfoList } = BoardRscService();

  const [boards, setBoards] = useState<Board.BoardResponseDto[]>([]);
  const [boardInfoMap, setBoardInfos] = useState<Map<string, Board.BoardDto>>(
    new Map(),
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [data1, data2]: [Board.BoardResponseDto[], Board.BoardDto[]] =
          await Promise.all([getMainBoardList(), getBoardInfoList()]);
        setBoards(data1);
        const map: Map<string, Board.BoardDto> = new Map();
        data2.forEach((data) => {
          map.set(data.id, data);
        });
        setBoardInfos(map);
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="absolute h-full w-full py-3">
            <div className="flex flex-col items-center">
              {roles.includes("ADMIN") ? (
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
              )}
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
            <button className="fixed bottom-28 left-1/2 -translate-x-1/2 transform rounded-3xl bg-red-500 px-6 py-3 font-bold text-white xl:bottom-10">
              게시판 생성
            </button>
          </Link>
        </>
      )}
    </>
  );
};

export default BoardPage;
