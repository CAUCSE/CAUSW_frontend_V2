'use client';
import { useMyInfoStore } from '@/fsd_entities/user';

export const useAuthHandler = () => {
  const userRole = useMyInfoStore((state) => state.roles);

  const hasAuth = userRole.includes('ADMIN') || 
                 userRole.includes('PRESIDENT') || 
                 userRole.includes('VICE_PRESIDENT');

  return { hasAuth };
};