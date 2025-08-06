'use client';

import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '../../api';
import { userQueryKey } from '../../config/queryKeys/userQueryKey';

export const useUserRoles = () => {
  return useQuery({
    queryKey: userQueryKey.all,
    queryFn: getMyInfo,
    select: (data) => ({
      roles: data.roles,
      circleIdIfLeader: data.circleIdIfLeader,
      circleNameIfLeader: data.circleNameIfLeader,
    }),
    staleTime: 1000 * 60 * 5,
  });
};