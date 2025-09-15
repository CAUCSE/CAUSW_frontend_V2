'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Search } from 'lucide-react';

import { Button } from '@/shadcn/components/ui';

export const SearchPostButton = () => {
  const pathname = usePathname();
  return (
    <Button variant="outline" size="icon" className="h-8 w-10 rounded-3xl border-[1px] border-black">
      <Link href={`${pathname}/search`}>
        <Search />
      </Link>
    </Button>
  );
};
