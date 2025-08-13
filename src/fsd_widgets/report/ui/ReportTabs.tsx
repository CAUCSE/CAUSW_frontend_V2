'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@/shadcn/components/ui/tabs';

const TABS_CONFIG = [
  { value: 'post', label: '게시글' },
  { value: 'comment', label: '댓글 · 대댓글' },
];

export const ReportTabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const activeType = params.get('type') ?? 'post';

  const onChangeTab = (value: string) => {
    const newUrl = `${pathname}?type=${value}`;
    router.push(newUrl);
  };

  return (
    <div className="border-b border-gray-200">
      <Tabs value={activeType} onValueChange={onChangeTab}>
        <TabsList className="flex w-full gap-2 px-4 pb-2 md:gap-4">
          {TABS_CONFIG.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
