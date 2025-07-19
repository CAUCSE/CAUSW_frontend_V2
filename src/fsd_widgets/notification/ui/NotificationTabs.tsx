'use client';

import { MESSAGES, NOTIFICATION_TAB } from '@/fsd_shared';
import { Tabs, TabsList, TabsTrigger } from '@/shadcn/components/ui';
import { NotificationActionButtons } from '@/fsd_widgets/notification';

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

export const NotificationTabs = ({ activeTab, setActiveTab, hasUnread }: Props) => {
  return (
    <div className="relative mt-8 mb-6 w-full border-b-[3px] border-[#bababa]">
      <Tabs value={String(activeTab)} onValueChange={(val) => setActiveTab(Number(val))} className="w-full">
        <TabsList className="flex w-full justify-start gap-4 overflow-x-auto overflow-y-hidden whitespace-nowrap px-4 py-2">
          {TABS_CONFIG.map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={String(tab.value)}
            >
              <div className="flex items-center gap-1.5">
                {hasUnread[tab.key as keyof typeof hasUnread] && (
                  <span className="mb-1.5 h-2 w-2 rounded-full bg-red-500" />
                )}
                <span className="leading-normal whitespace-nowrap">{tab.label}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 transform md:right-8">
        {activeTab === NOTIFICATION_TAB.CEREMONY && <NotificationActionButtons />}
      </div>
    </div>
  );
};
