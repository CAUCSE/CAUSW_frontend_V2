import Link from 'next/link';

import { BoardEmptyPostPreview } from './BoardEmptyPostPreview';
import { BoardPostPreview } from './BoardPostPreview';
import { EmptyBoard } from './EmptyBoard';

export const Board = ({ boardId, boardName, isDefault, contents }: Board.BoardResponseDto) => {
  return (
    <section>
      <h1 className="truncate text-xl font-semibold">
        <Link href={`/board/${boardId}`}>
          {isDefault ? <span className="underline">{boardName}</span> : <span>{boardName}</span>}
        </Link>
      </h1>
      <div className="mt-4 rounded-2xl border border-black bg-white px-4 text-center shadow-lg">
        {contents.length === 0 ? (
          <Link href={`/board/${boardId}`}>
            <EmptyBoard />
          </Link>
        ) : (
          <div className="divide-y-2">
            <BoardPostPreview contents={contents} boardId={boardId} />
            <BoardEmptyPostPreview contents={contents} />
          </div>
        )}
      </div>
    </section>
  );
};
