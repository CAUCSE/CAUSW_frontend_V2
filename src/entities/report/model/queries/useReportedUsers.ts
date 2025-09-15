'use client';

import { useQuery } from '@tanstack/react-query';

import { getReportedUsers } from '../../api/get';
import { reportQueryKey } from '../../config';

export const useReportedUsers = (pageNum = 0) =>
  useQuery({
    queryKey: reportQueryKey.users(pageNum),
    queryFn: () => getReportedUsers(pageNum),
    staleTime: 30_000,
  });
