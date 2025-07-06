/* import { ManagementPanel } from '@/fsd_entities/user/ui';

import { CircleRscService } from '@/shared';

const CircleManagement = async ({ params: { state, id } }: { params: { state: string; id: string } }) => {
  const { getCircleUsersByState } = CircleRscService();

  const data = await getCircleUsersByState(id, state === 'apply' ? 'AWAIT' : 'MEMBER');

  return (
    <>
      <ManagementPanel
        state={state}
        title="동아리원 관리"
        firstNavigation={{
          name: '동아리원 목록',
          state: 'member',
          exportType: 'CIRCLE_MEMBERS',
          router: '/setting/management/circle/' + id + '/member/detail',
        }}
        navigation={[
          {
            name: '동아리 신청 유저 목록',
            state: 'apply',
            exportType: 'CIRCLE_APPLY_USERS',
            router: '/setting/management/circle/' + id + '/apply',
          },
        ]}
        data={data.map((element) => ({
          userName: element.user.name,
          studentId: element.user.studentId,
          id: element.user.id,
        }))}
        circleId={id}
      />
    </>
  );
};

export default CircleManagement;
 */
