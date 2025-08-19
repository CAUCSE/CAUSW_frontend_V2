'use client';

import { useMutation } from '@tanstack/react-query';

import { restartVote } from '../../api';
import type { RestartVoteParam } from '../../type';

export const useRestartVote = () => {
  return useMutation({
    mutationFn: async ({ param }: { param: RestartVoteParam }) => {
      await restartVote(param);
    },
  });
};
