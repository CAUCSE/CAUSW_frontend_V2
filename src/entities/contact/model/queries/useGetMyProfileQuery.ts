import { useQuery } from '@tanstack/react-query';

import { contactQueryKey, getMyProfile } from '@/entities/contact';

/**
 * 내 프로필 정보를 조회하는 훅
 */
export const useGetMyProfileQuery = () => {
  return useQuery({
    queryKey: contactQueryKey.me(),
    queryFn: getMyProfile,
  });
};
