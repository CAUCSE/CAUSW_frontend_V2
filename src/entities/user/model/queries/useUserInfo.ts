'use client';

import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/entities/user';
import { userQueryKey } from '@/entities/user';

export const useUserInfo = (id: string) =>
  useQuery({
    queryKey: userQueryKey.detail(id),
    queryFn: () => getUser(id),
    enabled: !!id,
    staleTime: 30_000,
  });
