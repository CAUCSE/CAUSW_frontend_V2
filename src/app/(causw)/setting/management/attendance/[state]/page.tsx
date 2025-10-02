import { getAllAttendanceUsers, getWaitingUsers } from '@/entities/user/api';
import { ManagementPanel } from '@/entities/user/ui';

import { MESSAGES } from '@/shared';

const AttendanceManagement = async ({
  params: { state },
}: {
  params: { state: string };
}) => {
  const data =
    state === 'waiting'
      ? await getWaitingUsers().then((data) =>
          data.map((element) => ({
            userName: element.userName,
            studentId: element.studentId,
            userId: `${element.userId}&&&${element.userAcademicRecordApplicationId}`,
          })),
        )
      : await getAllAttendanceUsers();

  return (
    <>
      <ManagementPanel
        state={state}
        title={MESSAGES.MANAGEMENT.ATTENDANCE}
        firstNavigation={{
          name: '유저 목록',
          state: 'all',
          exportType: 'ALL_USERS',
          router: '/setting/management/attendance/detail/all',
        }}
        navigation={[
          {
            name: '승인 대기 목록',
            state: 'waiting',
            exportType: 'WAITING_USERS',
            router: '/setting/management/attendance/detail/waiting',
          },
        ]}
        data={data.map((element) => ({
          userName: element.userName,
          studentId: element.studentId,
          id: element.userId,
        }))}
      />
    </>
  );
};

export default AttendanceManagement;
