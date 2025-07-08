'use client';

import { useEffect } from 'react';

import { useLayoutStore } from '@/shared';

export const ErrorMessage = () => {
  const { errorMessage, setErrorMessage } = useLayoutStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  return (
    <div
      className={`${
        errorMessage ? 'block' : 'hidden'
      } bg-error fixed top-8 left-1/2 z-50 w-72 -translate-x-1/2 transform rounded px-5 py-2.5 text-center text-sm text-white shadow-md transition-opacity duration-500 md:w-80 md:text-base`}
    >
      {errorMessage}
    </div>
  );
};
