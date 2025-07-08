import { useMyInfoStore } from '@/fsd_entities/user/model';

export const useHasAuth = () => {
  const userRole = useMyInfoStore((state) => state.roles);
  const hasAuth = userRole.includes('ADMIN') || userRole.includes('PRESIDENT') || userRole.includes('VICE_PRESIDENT');
  return hasAuth;
};
