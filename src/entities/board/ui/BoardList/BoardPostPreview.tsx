import Link from 'next/link';

export const BoardPostPreview = ({
  contents,
  boardId,
}: Pick<Board.BoardResponseDto, 'contents' | 'boardId'>) => {
  return (
    <>
      {contents.map((content) => (
        <div key={content.contentId}>
          <Link href={`/board/${boardId}/${content.contentId}`}>
            <div className="truncate py-2">{content.title} </div>
          </Link>
        </div>
      ))}
    </>
  );
};
