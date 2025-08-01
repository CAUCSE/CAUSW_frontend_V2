import { useCallback } from 'react';

import { useShallow } from 'zustand/react/shallow';


import { FindEmailForm } from './FindEmailForm';
import { FindEmailResult } from './FindEmailResult';
import { useFindAccountStore } from '@/fsd_entities/auth/model/stores';

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
      {email !== '' ? <FindEmailResult /> : <FindEmailForm />}
    </div>
  );
};
