import { OccasionManagement } from '@/widget';

const firstNavigation = {
  name: '등록 신청 경조사',
  state: 'request',
  router: '/setting/management/occasion/request',
};

// 추가 탭이 필요할 경우 추가
const navigation: {
  name: string;
  state: 'request';
  router: string;
}[] = [];

type TOccasion = {
  occasionTitle: string;
  occasionId: string;
};

const Occasion = ({ params: { state } }: { params: { state: string } }) => {
  // TODO 경조사 가져오는 로직 연동 필요
  const data: TOccasion[] = [
    {
      occasionTitle: '테스트 경조사',
      occasionId: '1',
    },
  ];
  let isFirstNavigation;
  if (!state) {
    isFirstNavigation = true;
  } else if (navigation.length > 0) {
    isFirstNavigation = navigation.findIndex(element => element.state === state) === -1;
  } else {
    isFirstNavigation = false;
  }
  return (
    <OccasionManagement
      state={state}
      title="경조사 등록 신청 관리"
      firstNavigation={firstNavigation}
      navigation={navigation}
      data={data}
    />
  );
};

export default Occasion;
