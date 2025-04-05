'use client';

import { useEffect, useState } from 'react';

import { debounce } from '@/utils';

export const useIsWindowLg = () => {
  const [isViewPointLg, setIsViewPointLg] = useState(false);
  useEffect(() => {
    const checkWidth = () => setIsViewPointLg(window.innerWidth >= 1024 ? true : false);

    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => {
      window.removeEventListener('resize', checkWidth);
    };
  }, []);

  return { isViewPointLg };
};
