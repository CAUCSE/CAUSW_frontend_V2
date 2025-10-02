'use client';

import { ErrorFallback } from '@/shared';

export default function Error() {
  return <ErrorFallback message="홈 조회 도중 에러가 발생했습니다." />;
}
