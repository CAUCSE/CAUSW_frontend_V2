import { AllowAnonymousToggle, BoardCreateButton, BoardDetailForm, RoleSelectSection } from '@/fsd_entities/board';

import { PreviousButton } from '@/fsd_shared';

export const BoardCreationForm = () => {
  return (
    <div className="h-full w-full">
      <header>
        <PreviousButton className="pt-3 md:pl-5" />
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
