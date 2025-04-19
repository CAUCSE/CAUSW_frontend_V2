'use client';

import { useShallow } from 'zustand/react/shallow';

import { usePostCreationStore } from '../../model';
import { CustomToggle } from './CustomToggle';

export const AnonymousToggle = () => {
  const { isAnonymous, toggleAnonymous } = usePostCreationStore(
    useShallow(state => ({
      isAnonymous: state.isAnonymous,
      toggleAnonymous: state.toggleAnonymous,
    })),
  );

  return <CustomToggle isChecked={isAnonymous} onClick={toggleAnonymous} text="익명" />;
};
