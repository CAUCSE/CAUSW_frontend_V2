'use client';

import { useCreateBoard } from '../../model';

export const BoardCreateButton = () => {
  const { handleSubmit, hasAuth } = useCreateBoard();
  return (
    <button
      onClick={handleSubmit}
      className="fixed right-[9px] bottom-[70px] w-32 rounded-xl bg-red-500 px-6 py-3 font-bold text-white shadow-lg xl:bottom-10 xl:left-1/2 xl:-translate-x-1/2"
    >
      게시판 {hasAuth() ? '생성' : '신청'}
    </button>
  );
};
