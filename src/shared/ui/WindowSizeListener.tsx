'use client';

import { useEffect } from 'react';

import { breakpoint, useLayoutStore } from '@/shared';

export const WindowSizeListener = () => {
  const setBreakpoint = useLayoutStore((state) => state.setBreakpoint);

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(
        window.innerWidth > breakpoint.xl
          ? 'xl'
          : window.innerWidth > breakpoint.lg
            ? 'lg'
            : window.innerWidth > breakpoint.md
              ? 'md'
              : 'sm',
      );
    };

    window.addEventListener('resize', handleResize);

    //Initial settings
    setBreakpoint(
      window.innerWidth > breakpoint.xl
        ? 'xl'
        : window.innerWidth > breakpoint.lg
          ? 'lg'
          : window.innerWidth > breakpoint.md
            ? 'md'
            : 'sm',
    );

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return null;
};
