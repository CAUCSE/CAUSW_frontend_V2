'use client';

import { useQuery } from '@tanstack/react-query';

import { getUserReportedComments, getUserReportedPosts } from '../../api/get';
import { ReportedItem } from '../../config';
import { reportQueryKey } from '../../config/queryKey';

type ReportType = 'post' | 'comment';

export function useUserReportedList(type: ReportType, userId: string, pageNum = 0) {
  return useQuery<ReportedItem[]>({
    queryKey:
      type === 'post' ? reportQueryKey.userPosts(userId, pageNum) : reportQueryKey.userComments(userId, pageNum),
    queryFn: () => (type === 'post' ? getUserReportedPosts(userId, pageNum) : getUserReportedComments(userId, pageNum)),
    enabled: !!userId,
    staleTime: 30_000,
  });
}
