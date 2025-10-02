'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Plus } from 'lucide-react';

import { Button } from '@/shadcn/components/ui/button';

export const CreatePostButton = () => {
  const pathname = usePathname();
  return (
    <Button
      variant="outline"
      size="icon"
      className="h-8 w-10 rounded-3xl border-[1px] border-black"
    >
      <Link href={`${pathname}/create`}>
        <Plus />
      </Link>
    </Button>
  );
};
