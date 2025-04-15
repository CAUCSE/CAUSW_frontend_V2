import { useUserStore } from '@/shared';

export const useHasAuth = () => {
  const userRole = useUserStore(state => state.roles);
  const hasAuth = userRole.includes('ADMIN') || userRole.includes('PRESIDENT') || userRole.includes('VICE_PRESIDENT');
  return hasAuth;
};
