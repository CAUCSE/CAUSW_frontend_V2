import { AnonymousToggle, MultipleSelectionToggle, VoteTitleInput } from '@/fsd_entities/vote';

import { VoteOptionList } from './VoteOptionList';

export const VoteCreationForm = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div className="mt-4 flex w-full flex-col items-center gap-3 sm:flex-row sm:gap-0 lg:space-x-4">
          <VoteTitleInput />
          <div className="flex items-center lg:gap-4">
            <MultipleSelectionToggle />
            <AnonymousToggle />
          </div>
        </div>
      </div>
      <VoteOptionList />
    </div>
  );
};
