'use client';

import { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';

import { useFormResultStore } from '@/shared';

export const useFormResultPagination = () => {
  const { currentPage, setCurrentPage } = useFormResultStore(
    useShallow(state => ({
      currentPage: state.currentPage,
      setCurrentPage: state.setCurrentPage,
    })),
  );

  const moveToNextResult = async (
    totalDetailPage: number,
    hasNextPage: boolean,
    isFetchingNextPage: boolean,
    fetchNextPage: (
      options?: FetchNextPageOptions,
    ) => Promise<InfiniteQueryObserverResult<Form.ReplyPageResponseDto[], Error>>,
  ) => {
    if (currentPage + 1 <= totalDetailPage) {
      setCurrentPage(currentPage + 1);
    } else if (hasNextPage) {
      await fetchNextPage();
      if (isFetchingNextPage) setCurrentPage(currentPage + 1);
    }
  };

  const moveToPreviousResult = () => {
    if (currentPage - 1 > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return { moveToNextResult, moveToPreviousResult };
};
