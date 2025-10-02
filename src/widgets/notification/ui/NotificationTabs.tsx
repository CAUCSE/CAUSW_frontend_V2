'use client';

import { NotificationActionButtons } from '@/widgets/notification';

import { Tabs, TabsList, TabsTrigger } from '@/shadcn/components/ui';
import { MESSAGES, NOTIFICATION_TAB } from '@/shared';

interface Props {
  activeTab: number;
  setActiveTab: (index: number) => void;
  hasUnread: {
    alarm: boolean;
    ceremony: boolean;
  };
}

const TABS_CONFIG = [
  {
    value: NOTIFICATION_TAB.GENERAL,
    label: MESSAGES.NOTIFICATION.GENERAL,
    key: 'alarm',
  },
  {
    value: NOTIFICATION_TAB.CEREMONY,
    label: MESSAGES.NOTIFICATION.CEREMONY,
    key: 'ceremony',
  },
];

export const NotificationTabs = ({
  activeTab,
  setActiveTab,
  hasUnread,
}: Props) => {
  return (
    <div className="relative mt-2 mb-6 w-full border-b border-[#bababa]">
      <Tabs
        value={String(activeTab)}
        onValueChange={(val) => setActiveTab(Number(val))}
        className="w-full"
      >
        <TabsList className="flex w-full justify-start gap-1.5 overflow-x-auto px-4 py-2 md:gap-4 [&::-webkit-scrollbar]:hidden">
          {TABS_CONFIG.map((tab) => (
            <TabsTrigger key={tab.key} value={String(tab.value)}>
              <div className="flex items-center gap-1.5">
                {hasUnread[tab.key as keyof typeof hasUnread] && (
                  <span className="mb-1.5 h-2 w-2 rounded-full bg-red-500" />
                )}
                <span className="leading-normal whitespace-nowrap">
                  {tab.label}
                </span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="absolute top-1/2 right-4 hidden -translate-y-1/2 transform md:right-8 md:block">
        {activeTab === NOTIFICATION_TAB.CEREMONY && (
          <NotificationActionButtons />
        )}
      </div>
    </div>
  );
};
