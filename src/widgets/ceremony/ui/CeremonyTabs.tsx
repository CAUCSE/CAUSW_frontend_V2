'use client';

import { Tabs, TabsList, TabsTrigger } from '@/shadcn/components/ui';

interface TabItem {
  label: string;
  key: string;
}

interface CeremonyTabsProps {
  tabItems: TabItem[];
  activeTab: number;
  setActiveTab: (index: number) => void;
}

export const CeremonyTabs = ({
  tabItems,
  activeTab,
  setActiveTab,
}: CeremonyTabsProps) => {
  return (
    <div className="relative mt-2 mb-6 w-full border-b border-[#bababa]">
      <Tabs
        value={String(activeTab)}
        onValueChange={(val) => setActiveTab(Number(val))}
        className="w-full"
      >
        <TabsList className="flex w-full justify-start gap-1.5 overflow-x-auto px-4 py-2 md:gap-4 [&::-webkit-scrollbar]:hidden">
          {tabItems.map((item, index) => (
            <TabsTrigger
              key={item.key}
              value={String(index)}
              className="whitespace-nowrap"
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
