'use client';

import { PostSearchIntro, PostSkeletonList } from '@/entities';
import { Loading, PreviousButton, useSearchPost } from '@/shared';
import { PostSearchInput, PostSearchResult } from '@/widget';

export const PostSearch = () => {
  const {
    hasEverSearched,
    postList,
    boardId,
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
    <div className="flex h-full w-full flex-col items-center gap-[20px]">
      <div className="h-[50px] w-full bg-[#F8F8F8]">
        <PreviousButton />
      </div>
      {hasEverSearched ? (
        <div className="h-full w-full overflow-y-auto p-4">
          {isLoading ? (
            <PostSkeletonList />
          ) : (
            <div className="h-full w-full">
              <PostSearchResult postList={postList!} boardId={boardId as string} />
              {hasNextPage && (
                <div className="h-3 w-full" ref={targetRef}>
                  {isFetchingNextPage && (
                    <div className="pt-5">
                      <Loading loading={isFetchingNextPage} size={50} />
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
