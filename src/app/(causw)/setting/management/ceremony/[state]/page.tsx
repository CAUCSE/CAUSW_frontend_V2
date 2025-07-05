import { AdminCeremonyManagement } from '@/fsd_widgets/ceremony';

import { MESSAGES } from '@/fsd_shared';

const firstNavigation = {
  name: '등록 신청 경조사',
  state: 'request',
  router: '/setting/management/ceremony/request',
};

// 추가 탭이 필요할 경우 추가
const navigation: {
  name: string;
  state: 'request';
  router: string;
}[] = [];

const Occasion = ({ params: { state } }: { params: { state: string } }) => {
  return (
    <AdminCeremonyManagement
      state={state}
      title={MESSAGES.CEREMONY.REGISTRATION_LIST}
      firstNavigation={firstNavigation}
      navigation={navigation}
    />
  );
};

export default Occasion;
