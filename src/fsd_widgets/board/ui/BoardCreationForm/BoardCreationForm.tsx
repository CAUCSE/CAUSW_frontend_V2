import { AllowAnonymousToggle, BoardCreateButton, BoardDetailForm, RoleSelectSection } from '@/fsd_entities/board';

import { PreviousButton } from '@/fsd_shared';

export const BoardCreationForm = () => {
  return (
    <div className="relative bottom-12 top-0 h-full w-full xl:bottom-0">
      <header>
        <PreviousButton />
        <p className="pl-4 pt-12 text-2xl xl:text-3xl">게시판 생성</p>
      </header>
      <div className="mt-2 flex h-full flex-col pl-4">
        <BoardDetailForm />
        <RoleSelectSection />
        <AllowAnonymousToggle />
      </div>
      <BoardCreateButton />
    </div>
  );
};
