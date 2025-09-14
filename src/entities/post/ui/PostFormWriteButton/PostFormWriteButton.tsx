'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Pen } from 'lucide-react';

import { Button } from '@/shadcn/components/ui';

interface PostFormWriteButtonProps {
  formId: string;
}

export const PostFormWriteButton = ({ formId }: PostFormWriteButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClickFormWriteButton = () => {
    router.push(`${pathname}/${formId}`);
  };

  return (
    <Button
      variant="ghost"
      className="bg-post-form hover:bg-post-form hover:text-post-form flex cursor-pointer items-center gap-2 rounded-2xl p-1 px-3 text-xs text-black"
      onClick={handleClickFormWriteButton}
    >
      <Pen className="size-4 text-[#E626B0]" />
      <span>폼 작성</span>
    </Button>
  );
};
