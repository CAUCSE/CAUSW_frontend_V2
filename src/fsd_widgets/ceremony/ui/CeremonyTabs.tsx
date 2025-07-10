'use client';

import { Tabs, TabsList, TabsTrigger } from '@/shadcn/components/ui/tabs';

interface TabItem {
  label: string;
  key: string;
}

interface CeremonyTabsProps {
  tabItems: TabItem[];
  activeTab: number;
  setActiveTab: (index: number) => void;
}

export const CeremonyTabs = ({ tabItems, activeTab, setActiveTab }: CeremonyTabsProps) => {
  return (
    <div className="relative mt-8 mb-6 w-full border-b-[3px] border-[#bababa]">
      <Tabs
        value={String(activeTab)}
        onValueChange={(val) => setActiveTab(Number(val))}
        className="w-full"
      >
        <TabsList className="flex w-full justify-start gap-4 whitespace-nowrap px-4 py-2">
          {tabItems.map((item, index) => (
            <TabsTrigger
              key={item.key}
              value={String(index)}
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};