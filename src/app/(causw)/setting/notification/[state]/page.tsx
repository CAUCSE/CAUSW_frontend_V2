import Link from 'next/link';

import { OccasionNotification } from '@/fsd_widgets/notification';

import { Header } from '@/entities';

const firstNavigation = {
  name: '경조사 목록',
  state: 'occasion',
  router: '/setting/notification/occasion',
};

const secondtNavigation = {
  name: 'd사 목록',
  state: 'alarms',
  router: '/setting/notification/alarms',
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
    isFirstNavigation = navigation.findIndex(element => element.state === state) === -1;
  } else {
    isFirstNavigation = false;
  }

  return (
    <>
      <div className="relative left-4 top-3 w-[calc(100%-2rem)] md:left-14 md:top-14 md:w-[calc(100%-7rem)]">
        <Link href="/setting" className="mb-7 flex items-center text-lg">
          <span className="icon-[weui--back-filled] mr-6 text-3xl font-bold"></span>
          이전
        </Link>
        <Header bold big>
          전체 알림
        </Header>
        <div className='w-full" grid grid-cols-2 gap-16'>
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
        </div>
      </div>
    </>
  );
};

export default Occasion;
