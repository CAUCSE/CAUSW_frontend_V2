'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { detectDeviceType, LoadingComponent } from '@/shared';

import { checkAppAuthStatus } from './model/checkAuth';

export const AuthAppInitializer = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const deviceType = detectDeviceType();

    if (deviceType === 'ios' || deviceType === 'ipad' || deviceType === 'android') {
      const checkStatus = async () => {
        const isLoggedIn = await checkAppAuthStatus();
        if (isLoggedIn) {
          router.replace('/home');
        } else {
          router.replace('/auth/signin');
        }
        setLoading(false);
      };
      checkStatus();
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <LoadingComponent />;
  }

  return <>{children}</>;
};
