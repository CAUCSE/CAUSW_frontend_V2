"use client";

import { BoardRscService, useUserStore } from "@/shared";
import { useEffect, useState } from "react";

export const useGetBoardList = () => {
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

  return { boards, boardInfoMap, loading, roles };
};
