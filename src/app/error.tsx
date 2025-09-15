'use client';

//TODO//
//에러 페이지 JSX 업데이트 필요
import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { LoadingComponent } from '@/shared';
import {
  getRscRefresh,
  noAccessTokenCode,
  noPermissionCode,
} from '@/shared';
import { tokenManager } from '@/shared';

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  const router = useRouter();
  const { signoutAndRedirect, updateAccess } = tokenManager();
  
  const handleNoAccesss = async () => {
    const refresh = await getRscRefresh();
    if (!refresh) {
      await signoutAndRedirect();
    } else {
      try {
        await updateAccess(refresh);
        const timer = setTimeout(() => {
          reset();
        }, 1000);
        return () => clearTimeout(timer);
      } catch {
        await signoutAndRedirect();
      }
    }
  };

  useEffect(() => {
    if (noAccessTokenCode.includes(error.message)) {
      handleNoAccesss();
    } else if (noPermissionCode.includes(error.message)) router.push('/no-permission');
    else {
      signoutAndRedirect();
    }
  }, [error]);

  return <LoadingComponent />;
};

export default Error;
