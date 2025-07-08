'use client';

import { MESSAGES, NOTIFICATION_TAB } from '@/fsd_shared';
import { Tabs, TabsList, TabsTrigger } from '@/shadcn/components/ui/tabs';

import { NotificationActionButtons } from './NotificationActionButtons';

interface Props {
  activeTab: number;
  setActiveTab: (index: number) => void;
  hasUnread: {
    alarm: boolean;
    ceremony: boolean;
  };
}

export const NotificationTabs = ({ activeTab, setActiveTab, hasUnread }: Props) => {
  return (
    <div className="mt-8 mb-6 w-full border-b-[3px] border-[#bababa] px-2 pb-1 md:px-8">
      <Tabs defaultValue={String(activeTab)} onValueChange={(val) => setActiveTab(Number(val))} className="w-full">
        <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between md:gap-0">
          <TabsList className="w-full justify-start gap-4 overflow-x-auto overflow-y-hidden px-4 py-2 whitespace-nowrap md:w-auto">
            <TabsTrigger
              value={String(NOTIFICATION_TAB.GENERAL)}
              className="min-w-[120px] px-4 py-2 text-center leading-normal"
            >
              <div className="flex items-center gap-1">
                {hasUnread.alarm && <span className="mt-1 h-2.5 w-2.5 rounded-full bg-red-500" />}
                <span className="leading-normal whitespace-nowrap">{MESSAGES.NOTIFICATION.GENERAL}</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value={String(NOTIFICATION_TAB.CEREMONY)}
              className="min-w-[120px] px-4 py-2 text-center leading-normal"
            >
              <div className="flex items-center gap-1">
                {hasUnread.ceremony && <span className="mt-1 h-2.5 w-2.5 rounded-full bg-red-500" />}
                <span className="leading-normal whitespace-nowrap">{MESSAGES.NOTIFICATION.CEREMONY}</span>
              </div>
            </TabsTrigger>
          </TabsList>
          <div className="hidden md:block">
            {activeTab === NOTIFICATION_TAB.CEREMONY && <NotificationActionButtons />}
          </div>
        </div>
      </Tabs>
    </div>
  );
};
