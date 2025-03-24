import { Board } from "@/entities";

export const CustomBoard = ({
  boardInfos,
}: {
  boardInfos: Board.BoardResponseDto[];
}) => (
  <div className="grid w-[calc(100%-20px)] grid-cols-1 gap-x-5 gap-y-5 px-2 py-10 lg:grid-cols-2 lg:gap-y-10 xl:px-10">
    {boardInfos.map((boardInfo, idx) => (
      <Board
        boardId={boardInfo.boardId}
        boardName={boardInfo.boardName}
        isDefault={boardInfo.isDefault}
        contents={boardInfo.contents}
        key={idx}
      />
    ))}
  </div>
);
