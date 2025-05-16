<<<<<<< HEAD
'use client';

import { useRouter } from 'next/navigation';

import { NotificationActionButtons, NotificationTabs } from '@/fsd_widgets/notification';

import { useCeremonyNotificationData, useNotificationData, useNotificationTabParam } from '@/fsd_entities/notification';

import { CeremonyItem, ListBox } from '@/fsd_shared/ui/ListBox';

import { ERROR_MESSAGES, MESSAGES, NOTIFICATION_TAB } from '@/fsd_shared';

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
      title,
      body,
      isRead,
      targetId,
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
          {activeTab === NOTIFICATION_TAB.CEREMONY && (
            <div className="md:hidden">
              <NotificationActionButtons />
            </div>
          )}
        </div>
        <NotificationTabs activeTab={activeTab} setActiveTab={setActiveTab} hasUnread={hasUnread} />
        {activeTab === NOTIFICATION_TAB.GENERAL && (
          <>
            {alarmData.length === 0 ? (
              <div>{ERROR_MESSAGES.NOTIFICATION.EMPTY_GENERAL_ALARM}</div>
            ) : (
              <ListBox data={alarmData} alarm="general" />
            )}
          </>
        )}
        {activeTab === NOTIFICATION_TAB.CEREMONY && (
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
=======
import { OccasionNotification } from '@/widget';

const firstNavigation = {
  name: '경조사 목록',
  state: 'occasion',
  router: '/setting/notification',
};

<<<<<<<< HEAD:src/app/(causw)/setting/notification/[state]/page.tsx
========
const secondtNavigation = {
  name: 'd사 목록',
  state: 'alarms',
  router: '/setting/notification',
};
>>>>>>>> d74ad82 (refactor: remove state folder on notification folder):src/app/(causw)/setting/notification/page.tsx
// 추가 탭이 필요할 경우 추가
const navigation: {
  name: string;
  state: 'occasion' | 'alarms'; // 새로운 탭 상태 추가
  router: string;
}[] = [];

type TOccasion = {
  occasionTitle: string;
  occasionId: string;
};

const Occasion = ({ params: { state } }: { params: { state: string } }) => {
  // TODO 경조사 가져오는 로직 연동 필요
  const occasionData: TOccasion[] = [
    {
      occasionTitle: '테스트 경조사 1',
      occasionId: '1',
    },
    {
      occasionTitle: '테스트 경조사 2',
      occasionId: '2',
    },
  ];

  const alarmData: TOccasion[] = [
    {
      occasionTitle: '테스트 알림 1',
      occasionId: '3',
    },
    {
      occasionTitle: '테스트 알림 2',
      occasionId: '4',
    },
  ];

  // `state`에 따라 데이터를 결정
  const data: TOccasion[] = state === 'occasion' ? occasionData : state === 'alarms' ? alarmData : [];

  let isFirstNavigation;
  if (!state) {
    isFirstNavigation = true;
  } else if (navigation.length > 0) {
    isFirstNavigation = navigation.findIndex((element) => element.state === state) === -1;
  } else {
    isFirstNavigation = false;
  }

  return (
    <OccasionNotification
      state={state}
      title="전체 알림"
      firstNavigation={firstNavigation}
      navigation={navigation}
      data={data}
    />
  );
};

export default Occasion;
>>>>>>> d74ad82 (refactor: remove state folder on notification folder)
