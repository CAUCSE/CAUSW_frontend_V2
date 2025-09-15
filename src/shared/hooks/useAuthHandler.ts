'use client';
import { useUserRoles } from '@/entities/user';

export const useAuthHandler = () => {
  const { data: userInfo } = useUserRoles();
  
  const userRole = userInfo?.roles || [];

  const hasAuth = userRole.includes('ADMIN') || 
                 userRole.includes('PRESIDENT') || 
                 userRole.includes('VICE_PRESIDENT');

  return { hasAuth };
};