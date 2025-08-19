'use client';

import { useMutation } from '@tanstack/react-query';

import { submitVote } from '../../api';
import { SubmitVoteRequestDto } from '../../type';

export const useSubmitVote = () => {
  return useMutation({
    mutationFn: ({ dto }: { dto: SubmitVoteRequestDto }) => submitVote(dto),
  });
};
