import { useQuery } from '@tanstack/react-query';
import { getContactById, contactQueryKey } from '@/fsd_entities/contact';

/**
 * 특정 사용자 프로필 정보를 조회하는 훅
 * @param userId - 조회할 사용자의 ID
 */
export const useGetContactByIdQuery = (userId?: string) => {
  return useQuery({
    queryKey: contactQueryKey.detail(userId!),
    queryFn: () => getContactById(userId!),
    enabled: !!userId,
  });
};
