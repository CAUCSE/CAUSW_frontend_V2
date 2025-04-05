'use client';

import { useState } from 'react';

import { useParams } from 'next/navigation';

import { PostService, useInfiniteScroll } from '@/shared';

export const useSearchPost = () => {
  const params = useParams();
  const { boardId } = params;

  const [hasEverSearched, setHasEverSearched] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [inputText, setInputText] = useState<string>('');

  const { useGetSearchPostList } = PostService();
  const {
    fetchNextPage,
    data: postList,
    isLoading,
    isSuccess,
    isFetchingNextPage,
    hasNextPage,
  } = useGetSearchPostList(boardId as string, keyword, isSearch);

  const fetchCallback: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
        observer.unobserve(entry.target);
      }
    });
  };

  const { targetRef } = useInfiniteScroll({
    intersectionCallback: fetchCallback,
  });

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setIsSearch(false);
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputText !== '') {
      setKeyword(inputText);
      setIsSearch(true);
      setHasEverSearched(true);
    }
  };

  const handleSearchButtonClick = () => {
    if (inputText === '') {
      return;
    }
    setKeyword(inputText);
    setIsSearch(true);
    setHasEverSearched(true);
  };

  return {
    hasEverSearched,
    postList,
    targetRef,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    inputText,
    boardId,
    isSuccess,
    handleInputTextChange,
    handleEnterKey,
    handleSearchButtonClick,
  };
};
