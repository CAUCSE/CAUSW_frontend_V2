'use client';

import { useRouter } from 'next/navigation';

import { NotificationActionButtons, NotificationTabs } from '@/fsd_widgets/notification';

import { useCeremonyNotificationData, useNotificationData, useNotificationTabParam } from '@/fsd_entities/notification';

import { CeremonyItem, ListBox } from '@/fsd_shared/ui/ListBox';

import { ERROR_MESSAGES, MESSAGES } from '@/fsd_shared';

import BellIcon from '../../../../../public/icons/bell_icon.svg';

const Notification = () => {
  const router = useRouter();
  const { activeTab, setActiveTab } = useNotificationTabParam();
  const { notificationData } = useNotificationData();
  const { ceremonyNotificationData } = useCeremonyNotificationData();

  const alarmData: Notification.GeneralAlarmItem[] = notificationData.map(
    ({ notificationLogId, title, body, isRead, targetId, noticeType }) => ({
      id: notificationLogId,
      title,
      body,
      isRead,
      targetId,
      noticeType,
    }),
  );

  const ceremonyData: CeremonyItem[] = ceremonyNotificationData.map(
    ({ notificationLogId, title, body, isRead, targetId }) => ({
      id: notificationLogId,
      title: title,
      body: body,
      isRead: isRead,
      targetId: targetId,
    }),
  );

  const hasUnread = {
    alarm: alarmData.some(item => !item.isRead),
    ceremony: ceremonyData.some(item => !item.isRead),
  };

  return (
    <>
      <div className="relative left-4 top-3 w-[calc(100%-2rem)] md:left-14 md:top-14 md:w-[calc(100%-7rem)]">
        <div onClick={() => router.back()} className="mb-7 flex items-center text-base md:text-lg">
          <span className="icon-[weui--back-filled] mr-6 text-3xl font-bold"></span>
          {MESSAGES.PREVIOUS_BUTTON_TEXT}
        </div>

        <div className="flex flex-row items-center justify-between">
          <div className="text-2xl font-medium md:text-3xl">
            {MESSAGES.NOTIFICATION.ALL} <BellIcon className="inline-block md:hidden" />
          </div>
          {activeTab === 1 && (
            <div className="md:hidden">
              <NotificationActionButtons />
            </div>
          )}
        </div>
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
