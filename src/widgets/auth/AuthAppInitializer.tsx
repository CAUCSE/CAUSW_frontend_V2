'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { isNativeApp, LoadingComponent } from '@/shared';

import { checkAppAuthStatus } from './model/checkAuth';

export const AuthAppInitializer = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isNativeApp()) {
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
