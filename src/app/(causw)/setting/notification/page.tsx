'use client';

import { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Box, Tab, Tabs, Typography } from '@mui/material';

import { OccasionNotification } from '@/fsd_widgets/notification';

import { CeremonyItem, ListBox } from '@/fsd_shared/ui/ListBox';

import { Header } from '@/entities';

import MenuIcon from '../../../../../public/icons/menu.svg';
import AddIcon from '../../../../../public/icons/plus_icon.svg';
import SettingIcon from '../../../../../public/icons/setting.svg';

const firstNavigation = {
  name: '경조사 목록',
  state: 'occasion',
  router: '/setting/notification',
};

const secondtNavigation = {
  name: 'd사 목록',
  state: 'alarms',
  router: '/setting/notification',
};
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

const Notification = ({ params: { state } }: { params: { state: string } }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  // TODO 경조사 가져오는 로직 연동 필요
  const occasionData: CeremonyItem[] = [
    // {
    //   occasionTitle: '테스트 경조사 1',
    //   occasionId: '1',
    // },
    {
      id: 1,
      title: '경조사 알람1',
      subtitle: '2025.03.10 ~ 2025.03.11',
      isRead: true,
    },
  ];

  const alarmData: CeremonyItem[] = [
    // {
    //   occasionTitle: '테스트 알림 1',
    //   occasionId: '3',
    // },
    {
      id: 3,
      title: '알람1',
      subtitle: '2025.03.10 ~ 2025.03.11',
      isRead: false,
    },
  ];

  // `state`에 따라 데이터를 결정

  let isFirstNavigation;
  if (!state) {
    isFirstNavigation = true;
  } else if (navigation.length > 0) {
    isFirstNavigation = navigation.findIndex(element => element.state === state) === -1;
  } else {
    isFirstNavigation = false;
  }
  const pathname = usePathname();
  return (
    <>
      <div className="relative left-4 top-3 w-[calc(100%-2rem)] md:left-14 md:top-14 md:w-[calc(100%-7rem)]">
        <Link href="/setting" className="mb-7 flex items-center text-lg">
          <span className="icon-[weui--back-filled] mr-6 text-3xl font-bold"></span>
          이전
        </Link>
        {/* <Header bold big>
          전체 알림
        </Header> */}
        <div className="font-600 text-[48px]">전체 알림</div>

        <Tabs
          value={activeTab}
          TabIndicatorProps={{
            style: {
              height: '7px',
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
              fontSize: '32px',
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
              fontSize: '32px',
            }}
          />
          {activeTab === 1 && (
            <div className="flex flex-1 flex-row items-center justify-end gap-x-1">
              <Link href={`setting/notification`}>
                <AddIcon />
              </Link>
              <Link href={`${pathname}/list`}>
                <MenuIcon />
              </Link>
              <Link href={`setting/notification`}>
                <SettingIcon />
              </Link>
            </div>
          )}
        </Tabs>
        {activeTab === 0 && (
          <>
            <ListBox data={alarmData} />
          </>
        )}
        {activeTab === 1 && (
          <>
            <ListBox data={occasionData} />
          </>
        )}
        {/* <div className='w-full" grid grid-cols-2 gap-16'>
          <OccasionNotification
            name={'알림'}
            state={'alarms'}
            firstNavigation={firstNavigation}
            navigation={navigation}
            data={alarmData}
          />
          <OccasionNotification
            name={'경조사'}
            state={'occasion'}
            firstNavigation={secondtNavigation}
            navigation={navigation}
            data={occasionData}
          />
        </div> */}
      </div>
    </>
  );
};

export default Notification;
