'use client';

//TODO//
//에러 페이지 JSX 업데이트 필요
import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { LoadingComponent } from '@/fsd_shared';
import {
  getRscRefresh,
  noAccessTokenCode,
  noPermissionCode,
} from '@/fsd_shared';
import { useAuthHandler, useTokenHandler } from '@/fsd_shared';

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  const router = useRouter();
  const { updateAccess } = useTokenHandler();
  const { redirectToLogin } = useAuthHandler();

  const handleNoAccesss = async () => {
    const refresh = await getRscRefresh();
    if (!refresh) {
      redirectToLogin();
    } else {
      try {
        await updateAccess(refresh);
        const timer = setTimeout(() => {
          reset();
        }, 1000);
        return () => clearTimeout(timer);
      } catch {
        redirectToLogin();
      }
    }
  };

  useEffect(() => {
    if (noAccessTokenCode.includes(error.message)) {
      handleNoAccesss();
    } else if (noPermissionCode.includes(error.message)) router.push('/no-permission');
    else {
      redirectToLogin();
    }
  }, [error]);

  return <LoadingComponent />;
};

export default Error;
