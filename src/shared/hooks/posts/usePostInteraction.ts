'use client';

import { useParams, useRouter } from 'next/navigation';

export const usePostInteraction = () => {
  const params = useParams();
  const { boardId } = params;
  const router = useRouter();

  const routerCallback = () => {
    if (boardId === 'my' || boardId === 'search') {
      router.back();
      return;
    }
    router.replace(`/board/${boardId}`);
  };

  return {
    routerCallback,
  };
};
