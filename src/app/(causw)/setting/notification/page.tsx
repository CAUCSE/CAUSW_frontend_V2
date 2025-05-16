'use client';

import { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Tab, Tabs } from '@mui/material';

import { NotificationActionButtons } from '@/fsd_widgets/notification';

import { CeremonyItem, ListBox } from '@/fsd_shared/ui/ListBox';

import { Header } from '@/entities';

type TOccasion = {
  occasionTitle: string;
  occasionId: string;
};

const Notification = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  // TODO 경조사 가져오는 로직 연동 필요
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

  const pathname = usePathname();
  return (
    <>
      <div className="relative left-4 top-3 w-[calc(100%-2rem)] md:left-14 md:top-14 md:w-[calc(100%-7rem)]">
        <Link href="/setting" className="mb-7 flex items-center text-lg">
          <span className="icon-[weui--back-filled] mr-6 text-3xl font-bold"></span>
          이전
        </Link>
        <Header big>전체 알림</Header>

        <Tabs
          value={activeTab}
          TabIndicatorProps={{
            style: {
              height: '5px',
              backgroundColor: '#6bbeec',
              borderRadius: '20px',
            },
          }}
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-start',
            padding: '8px 8px 4px 16px',
            borderBottom: '3px solid #bababa',
            marginBottom: '24px',
          }}
        >
          <Tab
            label="알림"
            disableRipple
            onClick={() => setActiveTab(0)}
            sx={{
              textTransform: 'none',
              color: '#000',
              '&.Mui-selected': {
                color: '#000',
              },
              fontSize: '20px',
              fontWeight: '500',
            }}
          />
          <Tab
            label="경조사"
            disableRipple
            onClick={() => setActiveTab(1)}
            sx={{
              textTransform: 'none',
              color: '#000',
              '&.Mui-selected': {
                color: '#000',
              },
              fontSize: '20px',
            }}
          />
          {activeTab === 1 && <NotificationActionButtons />}
        </Tabs>
        {activeTab === 0 && <ListBox data={alarmData} />}
        {activeTab === 1 && <ListBox data={occasionData} />}
      </div>
    </>
  );
};

export default Notification;
