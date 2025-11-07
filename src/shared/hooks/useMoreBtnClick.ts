'use client';

import { useEffect } from 'react';

export const useMoreBtnClick = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, callback]);
};
