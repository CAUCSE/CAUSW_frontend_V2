"use client";

import { CustomBoard, DefaultBoard, LoadingComponent } from "@/entities";
import { useEffect, useState } from "react";

import { BoardRscService } from "@/shared";
import Link from "next/link";

const BoardPage = () => {
  const { getMainBoardList } = BoardRscService();

  const [boards, setBoards] = useState<Board.BoardResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getMainBoardList();
        setBoards(data);
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
              <DefaultBoard
                boardInfos={boards.filter(
                  (board: Board.BoardResponseDto) => board.isDefault,
                )}
              />
              <CustomBoard
                boardInfos={boards.filter(
                  (board: Board.BoardResponseDto) => !board.isDefault,
                )}
              />
            </div>
          </div>
          <Link href={`/board/create`}>
            <button className="fixed bottom-28 left-1/2 -translate-x-1/2 transform rounded-3xl bg-red-500 px-6 py-3 font-bold text-white lg:bottom-10">
              게시판 생성
            </button>
          </Link>
        </>
      )}
    </>
  );
};

export default BoardPage;
