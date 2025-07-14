'use client';

import { NotificationActionButtons, NotificationTabs } from '@/fsd_widgets/notification';
import {
  useCeremonyNotificationQuery,
  useNotificationQuery,
  useNotificationTabParam,
} from '@/fsd_entities/notification';

import {
  ERROR_MESSAGES,
  ListBox,
  MESSAGES,
  NOTIFICATION_TAB,
  PreviousButton,
} from '@/fsd_shared';

import BellIcon from '../../../../../public/icons/bell_icon.svg';

const Notification = () => {
  const { activeTab, setActiveTab } = useNotificationTabParam();
  const {
    data: notificationData,
    fetchNextPage: fetchNextGeneral,
    hasNextPage: hasNextGeneral,
    isFetchingNextPage: loadingGeneral,
  } = useNotificationQuery();

  const {
    data: ceremonyNotificationData,
    fetchNextPage: fetchNextCeremony,
    hasNextPage: hasNextCeremony,
    isFetchingNextPage: loadingCeremony,
  } = useCeremonyNotificationQuery();

  const alarmData: Notification.GeneralAlarmItem[] = (notificationData ?? []).map(
    ({ notificationLogId, title, body, isRead, targetId, noticeType, targetParentId }) => ({
      id: notificationLogId,
      title,
      body,
      isRead,
      targetId,
      targetParentId,
      noticeType,
    }),
  );

  const ceremonyData: Ceremony.ListBoxItem[] = (ceremonyNotificationData ?? []).map(
    ({ notificationLogId, title, body, isRead, targetId }) => ({
      id: notificationLogId,
      title,
      body,
      isRead,
      targetId,
    }),
  );

  const hasUnread = {
    alarm: alarmData.some((item) => !item.isRead),
    ceremony: ceremonyData.some((item) => !item.isRead),
  };

  const NotificationTab = {
    [NOTIFICATION_TAB.GENERAL]: () => (
      <ListBox
        data={alarmData}
        alarm="general"
        emptyMessage={ERROR_MESSAGES.NOTIFICATION.EMPTY_GENERAL_ALARM}
        loadMore={() => {
          if (hasNextGeneral && !loadingGeneral) {
            fetchNextGeneral();
          }
        }}
      />
    ),
    [NOTIFICATION_TAB.CEREMONY]: () => (
      <ListBox
        data={ceremonyData}
        emptyMessage={ERROR_MESSAGES.NOTIFICATION.EMPTY_CEREMONY_ALARM}
        loadMore={() => {
          if (hasNextCeremony && !loadingCeremony) {
            fetchNextCeremony();
          }
        }}
      />
    ),
  };

  return (
    <div className="relative top-3 left-4 w-[calc(100%-2rem)] md:top-14 md:left-14 md:w-[calc(100%-7rem)]">
      <PreviousButton className="mb-8" />

      <div className="flex flex-row items-center justify-between">
        <div className="text-2xl font-medium md:text-3xl">
          {MESSAGES.NOTIFICATION.ALL} <BellIcon className="inline-block md:hidden" />
        </div>
        {activeTab === NOTIFICATION_TAB.CEREMONY && (
          <div className="md:hidden">
            <NotificationActionButtons />
          </div>
        )}
      </div>

      <NotificationTabs activeTab={activeTab} setActiveTab={setActiveTab} hasUnread={hasUnread} />
      {NotificationTab[activeTab]()}
    </div>
  );
};

export default Notification;
