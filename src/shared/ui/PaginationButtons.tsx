import Link from 'next/link';

interface PaginationButtonProps {
  totalPages: number;
  currentPage: number;
  baseUrl: string; // ✅ 페이지네이션이 적용될 기본 URL
}

export const PaginationButtons = ({
  totalPages,
  currentPage,
  baseUrl,
}: PaginationButtonProps) => {
  const currentGroup = Math.floor((currentPage - 1) / 10);
  const startPage = currentGroup * 10 + 1;
  const endPage = Math.min(startPage + 9, totalPages);

  return (
    <div key={currentPage} className="mt-6 flex justify-center space-x-2 pb-6">
      {/*이전 그룹 (`<`) */}
      {currentPage > 10 && (
        <Link
          href={`${baseUrl}?page=${startPage - 1}`}
          className="rounded border bg-gray-200 px-3 py-2 text-black"
        >
          {'<'}
        </Link>
      )}

      {/*현재 그룹 내 페이지 버튼 */}
      {[...Array(endPage - startPage + 1)].map((_, index) => {
        const pageNumber = startPage + index;
        return (
          <Link
            key={pageNumber}
            href={`${baseUrl}?page=${pageNumber}`}
            className={`rounded border px-4 py-2 ${
              currentPage === pageNumber
                ? 'bg-focus text-white'
                : 'bg-gray-200 text-black'
            }`}
          >
            {pageNumber}
          </Link>
        );
      })}

      {/*다음 그룹 (`>` 버튼) */}
      {endPage < totalPages && (
        <Link
          href={`${baseUrl}?page=${endPage + 1}`}
          className="rounded border bg-gray-200 px-3 py-2 text-black"
        >
          {'>'}
        </Link>
      )}
    </div>
  );
};
