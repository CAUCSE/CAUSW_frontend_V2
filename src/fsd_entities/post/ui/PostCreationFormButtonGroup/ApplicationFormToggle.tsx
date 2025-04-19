'use client';

import clsx from 'clsx';
import { useShallow } from 'zustand/react/shallow';

import ApplyIcon from '../../../../../public/images/post/application.svg';
import { usePostCreationStore } from '../../model';

export const ApplicationFormToggle = () => {
  const { isApply, toggleApply } = usePostCreationStore(
    useShallow(state => ({
      isApply: state.isApply,
      toggleApply: state.toggleApply,
    })),
  );
  return (
    <button
      className={clsx(
        'flex w-16 items-center justify-center rounded-full md:w-20 md:p-3',
        isApply ? 'bg-[#E27C00]' : 'bg-[#d9d9d9]',
      )}
      onClick={toggleApply}
    >
      <ApplyIcon className="h-6 w-6 md:h-8 md:w-8" />
    </button>
  );
};
