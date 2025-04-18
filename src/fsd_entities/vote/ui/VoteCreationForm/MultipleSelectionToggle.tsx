'use client';

import { useShallow } from 'zustand/react/shallow';

import { useVoteCreationStore } from '../../model';
import { CustomToggle } from './CustomToggle';

export const MultipleSelectionToggle = () => {
  const { isMultipleChoice, toggleMultipleChoice } = useVoteCreationStore(
    useShallow(state => ({
      isMultipleChoice: state.isMultipleChoice,
      toggleMultipleChoice: state.toggleMultipleChoice,
    })),
  );

  return <CustomToggle isActive={isMultipleChoice} onClick={toggleMultipleChoice} text="복수 선택" />;
};
