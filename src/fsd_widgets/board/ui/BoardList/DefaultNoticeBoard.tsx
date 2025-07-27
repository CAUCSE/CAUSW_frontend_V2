import { Board } from '@/fsd_entities/board';

export const DefaultNoticeBoard = ({ boardInfos }: { boardInfos: Board.BoardResponseDto[] }) => (
  <div className="grid w-full grid-cols-1 gap-4 rounded-xl px-4 py-6 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-10 lg:px-28">
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
