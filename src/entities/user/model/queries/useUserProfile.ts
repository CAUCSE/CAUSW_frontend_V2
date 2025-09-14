'use client';

import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '../../api';
import { userQueryKey } from '../../config/queryKeys/userQueryKey';

// 프로필 관련 데이터 Hooks
export const useUserProfile = () => {
  return useQuery({
    queryKey: userQueryKey.all,
    queryFn: getMyInfo,
    select: (data) => ({
      id: data.id,
      email: data.email,
      name: data.name,
      nickname: data.nickname,
      profileImageUrl: data.profileImageUrl,
      phoneNumber: data.phoneNumber,
      isV2: data.isV2,
    }),
    staleTime: 1000 * 60 * 5,
  });
};
