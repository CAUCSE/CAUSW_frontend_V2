'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/shadcn/components/ui';

export const VoteResultButton = () => {
  const router = useRouter();
  const path = usePathname();

  const handleViewResult = () => {
    router.push(`${path}/result`);
  };

  return (
    <Button
      variant="link"
      onClick={handleViewResult}
      className="border-b-comment-bw border-normal-board-role-text text-normal-board-role-text h-fit cursor-pointer p-0 focus:outline-hidden"
    >
      <span className="underline hover:no-underline">투표 결과 확인하기</span>
    </Button>
  );
};
