'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getMyInfo } from '../../api';
import { userQueryKey } from '../../config/queryKeys/userQueryKey';

// 기본 유저 정보 Hook
export const useMyInfo = (): UseQueryResult<User.User, Error> => {
  return useQuery<User.User, Error>({
    queryKey: userQueryKey.all,
    queryFn: getMyInfo,
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    gcTime: 1000 * 60 * 10, // 10분간 가비지 컬렉션 방지
  });
};