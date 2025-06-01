'use client';

//TODO//
//에러 페이지 JSX 업데이트 필요
import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { LoadingComponent } from '@/entities';
import {
  allErrorCode,
  AuthRscService,
  AuthService,
  getRccRefresh,
  getRscAccess,
  getRscRefresh,
  noAccessTokenCode,
  noPermissionCode,
  noRefreshTokenCode,
  setRscHeader,
  setRscToken,
} from '@/shared';

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  const router = useRouter();
  const { signout } = AuthRscService();
  const { updateAccess } = AuthRscService();

  const handleNoRefresh = async () => {
    await signout();
    location.href = '/auth/signin';
  };

  const handleNoAccesss = async () => {
    const refresh = await getRscRefresh();
    if (!refresh) {
      handleNoRefresh();
    } else {
      try {
        await updateAccess(refresh);
        const timer = setTimeout(() => {
          reset();
        }, 1000);
        return () => clearTimeout(timer);
      } catch {
        handleNoRefresh();
      }
    }
  };

  useEffect(() => {
    if (noAccessTokenCode.includes(error.message)) {
      handleNoAccesss();
    } else if (noPermissionCode.includes(error.message)) router.push('/no-permission');
    else {
      handleNoRefresh();
    }
  }, [error]);

  return <LoadingComponent />;
};

export default Error;
