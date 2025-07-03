'use client';

import { useRouter } from 'next/navigation';

import { ChevronLeft } from 'lucide-react';

import { Button } from '@/shadcn/components/ui';
import { cn } from '@/shadcn/lib/utils';

interface PreviousButtonProps {
  routeCallback?: () => void;
  className?: string;
}

export const PreviousButton = ({ routeCallback, className }: PreviousButtonProps) => {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      onClick={() => (routeCallback ? routeCallback() : router.back())}
      className={cn('flex w-fit cursor-pointer items-center gap-2 hover:bg-transparent', className)}
      style={{
        // shadcn 버튼 기본 패딩 제거
        padding: 0,
      }}
    >
      <ChevronLeft className="size-8" />
      <p className="text-base md:text-lg">이전</p>
    </Button>
  );
};
