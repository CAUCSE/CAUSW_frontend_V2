import Link from "next/link";

export interface IBoardContent {
  title: string;
}

export interface IBoardInfo {
  boardId: string;
  boardName: string;
  isDefault: boolean;
  contents: Array<IBoardContent>;
}

export interface IBoardResponseDto {
  boardId: string;
  isDefault: boolean;
  boardName: string;
  contents: Array<string>;
}

export const EmptyContent = () => (
  <ul className="divide-y-2 divide-transparent">
    <li className="py-2">　</li>
    <li className="py-2">게시물이 없습니다.</li>
    <li className="py-2">　</li>
  </ul>
);

export const Board = ({
  boardId,
  boardName,
  isDefault,
  contents,
}: IBoardInfo) => {
  const emptyContents = new Array(3 - contents.length).fill(0);
  return (
    <div>
      <h1 className="truncate text-xl font-semibold">
        <Link href={`/board/${boardId}`}>
          {isDefault ? (
            <span className="underline">{boardName}</span>
          ) : (
            <span>{boardName}</span>
          )}
        </Link>
      </h1>

      <div className="mt-4 rounded-2xl border border-black bg-white px-4 text-center shadow-lg">
        <Link href={`/board/${boardId}`}>
          {contents.length === 0 ? (
            <EmptyContent />
          ) : (
            <ul className="divide-y-2">
              {contents.map((content, idx) => (
                <li className="truncate py-2" key={idx}>
                  {content.title}
                </li>
              ))}
              {emptyContents.map((content, idx) => (
                <li className="py-2" key={idx}>
                  　
                </li>
              ))}
            </ul>
          )}
        </Link>
      </div>
    </div>
  );
};

export const DefaultBoard = ({
  boardInfos,
}: {
  boardInfos: Array<IBoardInfo>;
}) => (
  <div className="grid w-full grid-cols-1 gap-x-5 gap-y-5 rounded-2xl border border-red-500 bg-boardBackground p-10 lg:grid-cols-2 lg:gap-y-10">
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

export const CustomBoard = ({
  boardInfos,
}: {
  boardInfos: Array<IBoardInfo>;
}) => (
  <div className="grid w-full grid-cols-1 gap-x-5 gap-y-5 p-10 lg:grid-cols-2 lg:gap-y-10">
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
