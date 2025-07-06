import { getAllAttendanceUsers, getWaitingUsers } from '@/fsd_entities/user/api';
import { Management } from '@/fsd_entities/user/ui';

const AttendanceManagement = async ({ params: { state } }: { params: { state: string } }) => {
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
      <div className="absolute top-6 right-4 flex h-10 w-48 items-center justify-center rounded-2xl border-2 border-black text-lg md:top-16 md:right-52">
        재학 인증 일괄 요청
      </div>
      <Management
        state={state}
        title="학적 상태 관리"
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
