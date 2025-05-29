import { Board } from '@/fsd_entities/board';

export const DefaultNoticeBoard = ({ boardInfos }: { boardInfos: Board.BoardResponseDto[] }) => (
  <div className="bg-board-background grid w-[calc(100%-20px)] grid-cols-1 gap-x-5 gap-y-5 rounded-2xl border border-red-500 p-10 lg:grid-cols-2 lg:gap-y-10">
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
