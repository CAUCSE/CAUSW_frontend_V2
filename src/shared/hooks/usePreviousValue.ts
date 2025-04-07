'use client';

import { useEffect, useRef } from 'react';

export const usePreviousValue = <T>(value: any) => {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
