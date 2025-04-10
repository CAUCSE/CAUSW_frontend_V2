import { OccasionRequestManagement } from '@/fsd_widgets/occasion/ui';

import { MESSAGES } from '@/fsd_shared/configs/constants';

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

const Occasion = ({ params: { state } }: { params: { state: string } }) => {
  let isFirstNavigation;
  if (!state) {
    isFirstNavigation = true;
  } else if (navigation.length > 0) {
    isFirstNavigation = navigation.findIndex(element => element.state === state) === -1;
  } else {
    isFirstNavigation = false;
  }
  return (
    <OccasionRequestManagement
      state={state}
      title={MESSAGES.OCCASION.TITLE}
      firstNavigation={firstNavigation}
      navigation={navigation}
    />
  );
};

export default Occasion;
