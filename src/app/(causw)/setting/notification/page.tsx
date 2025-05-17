'use client';

import { useState } from 'react';

import Link from 'next/link';

import { NotificationTabs } from '@/fsd_widgets/notification';

import { useNotificationData } from '@/fsd_entities/notification';

import { CeremonyItem, ListBox } from '@/fsd_shared/ui/ListBox';

import { Header } from '@/entities';

type TOccasion = {
  occasionTitle: string;
  occasionId: string;
};

const Notification = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { notificationData } = useNotificationData();
  console.log('notificationData', notificationData);

  const occasionData: CeremonyItem[] = [
    {
      id: 1,
      title: '경조사 알람1',
      subtitle: '2025.03.10 ~ 2025.03.11',
      isRead: true,
    },
  ];

  const alarmData: CeremonyItem[] = [
    {
      id: 3,
      title: '알람1',
      subtitle: '2025.03.10 ~ 2025.03.11',
      isRead: false,
    },
  ];

  return (
    <>
      <div className="relative left-4 top-3 w-[calc(100%-2rem)] md:left-14 md:top-14 md:w-[calc(100%-7rem)]">
        <Link href="/setting" className="mb-7 flex items-center text-lg">
          <span className="icon-[weui--back-filled] mr-6 text-3xl font-bold"></span>
          이전
        </Link>
        <Header big>전체 알림</Header>

        <NotificationTabs activeTab={activeTab} setActiveTab={setActiveTab} showActionButtons={activeTab === 1} />
        {activeTab === 0 && <ListBox data={alarmData} />}
        {activeTab === 1 && <ListBox data={occasionData} />}
      </div>
    </>
  );
};

export default Notification;
