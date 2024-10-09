import { EmptyContent } from "@/entities";
import Link from "next/link";

export const Board = ({
  boardId,
  boardName,
  isDefault,
  contents,
}: Board.BoardResponseDto) => {
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
            <div className="divide-y-2">
              {contents.map((content, idx) => (
                <div key={content.contentId}>
                  <Link href={`/board/${boardId}/${content.contentId}`}>
                    <div className="truncate py-2">{content.title} </div>
                  </Link>
                </div>
              ))}
              {emptyContents.map((_, idx) => (
                <div className="py-2" key={idx}>
                  　
                </div>
              ))}
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};
