'use client';

import { useRef } from 'react';

import { useShallow } from 'zustand/react/shallow';

import { useBoardCreationStore } from '../../model';

export const BoardDetailForm = () => {
  const { boardName, boardDescription, setBoardName, setBoardDescription } = useBoardCreationStore(
    useShallow((state) => ({
      boardName: state.boardName,
      boardDescription: state.boardDescription,
      setBoardName: state.setBoardName,
      setBoardDescription: state.setBoardDescription,
    })),
  );

  const boardDescriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleBoardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.target.value);
  };

  const handleBoardDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBoardDescription(e.target.value);
    if (boardDescriptionRef.current) {
      boardDescriptionRef.current.style.height = 'auto';
      boardDescriptionRef.current.style.height = boardDescriptionRef.current.scrollHeight + 'px';
    }
  };

  return (
    <div className="flex flex-col gap-4 xl:gap-6">
      <section>
        <label className="mb-2 text-xl xl:text-2xl">게시판 이름</label>
        <input
          type="text"
          className="text-md w-full border-b-post-title-input border-black bg-transparent text-black focus:outline-none xl:text-lg"
          value={boardName}
          onChange={handleBoardNameChange}
          placeholder="게시판 이름을 입력해주세요"
        />
      </section>
      <section>
        <label className="mb-2 text-xl xl:text-2xl">게시판 설명</label>
        <textarea
          className="text-md w-full resize-none border-b border-black bg-transparent text-black focus:outline-none xl:text-lg"
          value={boardDescription}
          onChange={handleBoardDescriptionChange}
          placeholder="게시판 설명을 입력해주세요"
          ref={boardDescriptionRef}
        />
      </section>
    </div>
  );
};
