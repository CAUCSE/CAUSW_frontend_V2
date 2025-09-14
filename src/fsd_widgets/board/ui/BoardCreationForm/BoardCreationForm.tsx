'use client';

import {
  AllowAnonymousToggle,
  BoardCreateButton,
  BoardDetailForm,
  RoleSelectSection,
  AllowAlumniToggle,
} from '@/entities/board';

import { PreviousButton, useAuthHandler } from '@/shared';

export const BoardCreationForm = () => {
  const { hasAuth } = useAuthHandler();

  return (
    <div className="relative top-3 left-4 w-[calc(100%-2rem)] pb-12 md:top-14 md:left-14 md:w-[calc(100%-7rem)]">
      <header>
        <PreviousButton className="mb-8" />
        <p className="text-2xl xl:text-3xl">게시판 생성</p>
      </header>
      <div className="mt-2 flex h-full flex-col">
        <BoardDetailForm />
        <RoleSelectSection />
        <AllowAnonymousToggle />
        {hasAuth && <AllowAlumniToggle />}
      </div>
      <BoardCreateButton />
    </div>
  );
};
