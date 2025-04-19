'use client';

import clsx from 'clsx';
import { useShallow } from 'zustand/react/shallow';

import VoteIcon from '../../../../../public/images/post/vote.svg';
import { usePostCreationStore } from '../../model';

export const VoteToggle = () => {
  const { isVote, toggleVote } = usePostCreationStore(
    useShallow(state => ({
      isVote: state.isVote,
      toggleVote: state.toggleVote,
    })),
  );

  return (
    <button
      className={clsx(
        'flex w-16 items-center justify-center rounded-full md:w-20 md:p-3',
        isVote ? 'bg-[#FFCE31]' : 'bg-[#d9d9d9]',
      )}
      onClick={toggleVote}
    >
      <VoteIcon className="h-6 w-6 md:h-8 md:w-8" />
    </button>
  );
};
