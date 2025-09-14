'use client';

import { PostSkeletonList, useSearchPost } from '@/entities/post';

import { LoadingSpinner, PreviousButton } from '@/fsd_shared';

import { PostSearchInput } from './PostSearchInput';
import { PostSearchIntro } from './PostSearchIntro';
import { PostSearchResult } from './PostSearchResult';

export const PostSearch = () => {
  const {
    hasEverSearched,
    postList,
    hasNextPage,
    isFetchingNextPage,
    targetRef,
    inputText,
    isLoading,
    handleInputTextChange,
    handleEnterKey,
    handleSearchButtonClick,
  } = useSearchPost();

  return (
    <div className="flex h-full w-full flex-col items-center gap-5 pt-3 pb-5">
      <PreviousButton className="self-start pl-5" />
      {hasEverSearched ? (
        <div className="h-full w-full overflow-y-auto p-4">
          {isLoading ? (
            <PostSkeletonList />
          ) : (
            <div className="h-full w-full">
              <PostSearchResult postList={postList!} />
              {hasNextPage && (
                <div className="h-3 w-full" ref={targetRef}>
                  {isFetchingNextPage && (
                    <div className="pt-5">
                      <LoadingSpinner loading={isFetchingNextPage} size={50} />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <PostSearchIntro />
      )}
      <PostSearchInput
        handleInputTextChange={handleInputTextChange}
        handleEnterKey={handleEnterKey}
        handleSearchButtonClick={handleSearchButtonClick}
        inputText={inputText}
      />
    </div>
  );
};
