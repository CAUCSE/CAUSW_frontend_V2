'use client';

import { useRouter } from 'next/navigation';

import { NotificationTabs } from '@/fsd_widgets/notification';

import { useCeremonyNotificationData, useNotificationData, useNotificationTabParam } from '@/fsd_entities/notification';

import { CeremonyItem, ListBox } from '@/fsd_shared/ui/ListBox';

import { ERROR_MESSAGES, Header, MESSAGES } from '@/fsd_shared';

const Notification = () => {
  const router = useRouter();
  const { activeTab, setActiveTab } = useNotificationTabParam();
  const { notificationData } = useNotificationData();
  const { ceremonyNotificationData } = useCeremonyNotificationData();

  const alarmData: Notification.GeneralAlarmItem[] = notificationData.map(data => ({
    id: data.notificationLogId,
    title: data.title,
    body: data.body,
    isRead: data.isRead,
    targetId: data.targetId,
    noticeType: data.noticeType,
  }));

  const ceremonyData: CeremonyItem[] = ceremonyNotificationData.map(data => ({
    id: data.targetId,
    title: data.title,
    body: data.body,
    isRead: data.isRead,
  }));

  const hasUnread = {
    alarm: alarmData.some(item => !item.isRead),
    ceremony: ceremonyData.some(item => !item.isRead),
  };

  return (
    <>
      <div className="relative left-4 top-3 w-[calc(100%-2rem)] md:left-14 md:top-14 md:w-[calc(100%-7rem)]">
        <div onClick={() => router.back()} className="mb-7 flex items-center text-lg">
          <span className="icon-[weui--back-filled] mr-6 text-3xl font-bold"></span>
          {MESSAGES.PREVIOUS_BUTTON_TEXT}
        </div>
        <Header big>{MESSAGES.NOTIFICATION.ALL}</Header>

        <NotificationTabs activeTab={activeTab} setActiveTab={setActiveTab} hasUnread={hasUnread} />
        {activeTab === 0 && (
          <>
            {alarmData.length === 0 ? (
              <div>{ERROR_MESSAGES.NOTIFICATION.EMPTY_GENERAL_ALARM}</div>
            ) : (
              <ListBox data={alarmData} alarm="general" />
            )}
          </>
        )}
        {activeTab === 1 && (
          <>
            {ceremonyData.length === 0 ? (
              <div>{ERROR_MESSAGES.NOTIFICATION.EMPTY_CEREMONY_ALARM}</div>
            ) : (
              <ListBox data={ceremonyData} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Notification;
