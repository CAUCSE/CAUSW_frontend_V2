'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { markAsRead } from '../../api/post';
import { notificationQueryKey } from '../queries/notificationQueryKey';

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationQueryKey.top4.all(),
      });
      queryClient.invalidateQueries({
        queryKey: notificationQueryKey.count(),
      });
    },
    // TODO: 에러 처리하기
    onError: () => {},
  });
};
