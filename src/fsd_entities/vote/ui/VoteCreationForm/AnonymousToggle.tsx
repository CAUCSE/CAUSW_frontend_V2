'use client';

import { useShallow } from 'zustand/react/shallow';

import { useVoteCreationStore } from '../../model';
import { CustomToggle } from './CustomToggle';

export const AnonymousToggle = () => {
  const { allowAnonymous, toggleAllowAnonymous } = useVoteCreationStore(
    useShallow(state => ({
      allowAnonymous: state.allowAnonymous,
      toggleAllowAnonymous: state.toggleAllowAnonymous,
    })),
  );

  return <CustomToggle isActive={allowAnonymous} onClick={toggleAllowAnonymous} text="익명 투표" />;
};
