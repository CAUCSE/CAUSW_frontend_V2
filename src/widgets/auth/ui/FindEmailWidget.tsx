import { useCallback } from 'react';

import { useShallow } from 'zustand/react/shallow';

import { useFindAccountStore } from '@/entities/auth/model/stores';

import { PreviousButton } from '@/shared';

import { FindEmailForm } from './FindEmailForm';
import { FindEmailResult } from './FindEmailResult';

export const FindEmailWidget = () => {
  const { email, resetFindAccountStore } = useFindAccountStore(
    useShallow((state) => ({
      email: state.email,
      resetFindAccountStore: state.resetFindAccountStore,
    })),
  );

  return (
    <div
      className="bg-board-page-background flex min-h-screen flex-col items-center justify-center px-4 sm:px-0"
      ref={useCallback(() => {
        resetFindAccountStore();
      }, [])}
    >
      <PreviousButton className="fixed top-0 left-0 mt-4" />
      {email !== '' ? <FindEmailResult /> : <FindEmailForm />}
    </div>
  );
};
