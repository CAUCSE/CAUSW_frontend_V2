'use client';

import { useMutation } from '@tanstack/react-query';

import { endVote } from '../../api';
import type { EndVoteParam } from '../../type';

export const useEndVote = () => {
  return useMutation({
    mutationFn: async ({ param }: { param: EndVoteParam }) => {
      await endVote(param);
    },
  });
};
