"use client";

import { useCallback } from "react";

interface PostSearchInputProps {
  handleInputTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchButtonClick: () => void;
  handleEnterKey: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputText: string;
}

export const PostSearchInput = ({
  handleInputTextChange,
  handleEnterKey,
  handleSearchButtonClick,
  inputText,
}: PostSearchInputProps) => {
  return (
    <div className="flex h-14 w-full justify-center">
      <div className="flex h-full w-full justify-between gap-4 lg:w-3/4">
        <input
          type="text"
          className="h-full w-full rounded-3xl border border-black text-center"
          placeholder="글 제목, 내용, 해시태그"
          onChange={handleInputTextChange}
          onKeyUp={handleEnterKey}
          value={inputText}
          ref={useCallback((node: HTMLInputElement) => {
            if (node) {
              node.focus();
            }
          }, [])}
        />
        <button
          className="w-36 rounded-3xl bg-red-500 text-white"
          onClick={handleSearchButtonClick}
        >
          검색
        </button>
      </div>
    </div>
  );
};
