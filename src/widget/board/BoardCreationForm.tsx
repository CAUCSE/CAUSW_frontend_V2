'use client';

import { AllowAnonymousToggle, BoardDetailForm, RoleSelectSection } from '@/entities';
import { PreviousButton, useCreateBoard } from '@/shared';
import { roles } from '@/utils';

export const BoardCreationForm = () => {
  const { handleSubmit, hasAuth } = useCreateBoard();

  return (
    <div className="relative bottom-12 top-0 h-full w-full xl:bottom-0">
      <div className="w-full flex-col items-center">
        <PreviousButton />
      </div>
      <div className="flex h-full flex-col p-2 pt-10 xl:p-10">
        <BoardDetailForm />
        <RoleSelectSection roles={roles} />
        <AllowAnonymousToggle />
      </div>

      <button
        onClick={handleSubmit}
        className="fixed bottom-[70px] right-[9px] w-32 rounded-xl bg-red-500 px-6 py-3 font-bold text-white shadow-lg xl:bottom-10 xl:left-1/2 xl:-translate-x-1/2"
      >
        {hasAuth ? '게시판 생성' : '게시판 생성 신청'}
      </button>
    </div>
  );
};
