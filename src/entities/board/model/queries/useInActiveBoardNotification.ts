'use client';

import { useMutation } from '@tanstack/react-query';

import { inactiveBoardNotification } from '../../api';

export const useInActiveBoardNotification = () => {
  return useMutation({
    mutationFn: ({ boardId }: { boardId: string }) =>
      inactiveBoardNotification({ boardId }),
  });
};
