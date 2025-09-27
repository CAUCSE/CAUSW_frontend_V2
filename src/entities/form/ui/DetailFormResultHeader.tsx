'use client';

import Image from 'next/image';

import { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';

import { useFormResultStore, useFormResultPagination } from '@/entities/form';

interface DetailFormResultHeaderProps {
  totalDetailPage: number;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<InfiniteQueryObserverResult<Form.ReplyPageResponseDto[], Error>>;
}

export const DetailFormResultHeader = ({
  totalDetailPage,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: DetailFormResultHeaderProps) => {
  const currentPage = useFormResultStore((state) => state.currentPage);
  const { moveToNextResult, moveToPreviousResult } = useFormResultPagination();

  return (
    <div className="flex w-full items-center justify-center">
      <button onClick={moveToPreviousResult}>
        <Image src="/images/page_decrease_btn_icon.png" alt="page-decrease-btn" width={10} height={10} />
      </button>
      <p className="px-4 text-2xl">
        {currentPage} / {totalDetailPage}
        {hasNextPage && '+'}
      </p>
      <button onClick={() => moveToNextResult(totalDetailPage, hasNextPage, isFetchingNextPage, fetchNextPage)}>
        <Image src="/images/page_increase_btn_icon.png" alt="page-increase-btn" width={10} height={10} />
      </button>
    </div>
  );
};
