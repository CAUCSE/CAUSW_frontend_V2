'use client';

import { useMutation } from '@tanstack/react-query';

import { activeBoardNotification } from '../../api';

export const useActiveBoardNotification = () => {
  return useMutation({
    mutationFn: ({ boardId }: { boardId: string }) =>
      activeBoardNotification({ boardId }),
  });
};
