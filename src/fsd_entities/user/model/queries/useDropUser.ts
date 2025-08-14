'use client';

import { useMutation } from '@tanstack/react-query';

import { dropUser } from '../../api';

export const useDropUser = () =>
  useMutation({
    mutationFn: ({ userId, reason }: { userId: string; reason: string }) => dropUser(userId, reason),
  });
