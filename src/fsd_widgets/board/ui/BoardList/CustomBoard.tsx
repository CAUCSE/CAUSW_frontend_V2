import { Board } from '@/entities/board';

export const CustomBoard = ({ boardInfos }: { boardInfos: Board.BoardResponseDto[] }) => (
  <div className="grid w-full grid-cols-1 gap-4 rounded-xl px-4 py-1 pb-6 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-10 lg:px-28 lg:py-3">
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
