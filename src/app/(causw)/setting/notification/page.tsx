'use client';

import { useState } from 'react';

import Link from 'next/link';

import { NotificationTabs } from '@/fsd_widgets/notification';

import { useCeremonyNotificationData, useNotificationData } from '@/fsd_entities/notification';

import { CeremonyItem, ListBox } from '@/fsd_shared/ui/ListBox';

import { Header } from '@/entities';

const Notification = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { notificationData } = useNotificationData();
  const { ceremonyNotificationData } = useCeremonyNotificationData();
  // const [alarmData, setAlarmData] = useState<CeremonyItem[]>([]);
  console.log('notificationData', notificationData);
  console.log('ceremonyNotificationData', ceremonyNotificationData);
  const alarmData: CeremonyItem[] = notificationData.map(data => ({
    id: data.notificationLogId,
    title: data.title,
    body: data.body,
    isRead: data.isRead,
  }));

  const ceremonyData: CeremonyItem[] = ceremonyNotificationData.map(data => ({
    id: data.notificationLogId,
    title: data.title,
    body: data.body,
    isRead: data.isRead,
  }));

  return (
    <>
      <div className="relative left-4 top-3 w-[calc(100%-2rem)] md:left-14 md:top-14 md:w-[calc(100%-7rem)]">
        <Link href="/setting" className="mb-7 flex items-center text-lg">
          <span className="icon-[weui--back-filled] mr-6 text-3xl font-bold"></span>
          이전
        </Link>
        <Header big>전체 알림</Header>

        <NotificationTabs activeTab={activeTab} setActiveTab={setActiveTab} showActionButtons={activeTab === 1} />
        {activeTab === 0 && (
          <>{alarmData.length === 0 ? <div>일반 알람이 없습니다.</div> : <ListBox data={alarmData} />}</>
        )}
        {activeTab === 1 && (
          <>{ceremonyData.length === 0 ? <div>경조사 알람이 없습니다.</div> : <ListBox data={ceremonyData} />}</>
        )}
      </div>
    </>
  );
};

export default Notification;
