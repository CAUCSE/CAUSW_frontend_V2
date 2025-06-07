import { AllowAnonymousToggle, BoardCreateButton, BoardDetailForm, RoleSelectSection } from '@/fsd_entities/board';

import { PreviousButton } from '@/fsd_shared';

export const BoardCreationForm = () => {
  return (
    <div className="relative top-0 bottom-12 h-full w-full xl:bottom-0">
      <header>
        <PreviousButton />
        <p className="pt-12 pl-4 text-2xl xl:text-3xl">게시판 생성</p>
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
