import { Management } from '@/fsd_entities/user/ui';

import { SettingRscService } from '@/shared';

const navigation: {
  name: string;
  state: 'reject' | 'active' | 'drop' | 'inactive';
  router: string;
  exportType?: Setting.ExportType;
}[] = [
  {
    name: '가입 거부 유저',
    state: 'reject',
    exportType: 'REJECT_USERS',
    router: '/setting/management/user/reject',
  },
  {
    name: '활성 유저',
    state: 'active',
    exportType: 'ACTIVE_USERS',
    router: '/setting/management/user/active',
  },
  {
    name: '추방 유저',
    state: 'drop',
    exportType: 'DROP_USERS',
    router: '/setting/management/user/drop',
  },
  {
    name: '탈퇴 유저',
    state: 'inactive',
    exportType: 'INACTIVE_USERS',
    router: '/setting/management/user/inactive',
  },
];

const UserManagement = async ({
  params: { state },
  searchParams,
}: {
  params: { state: string };
  searchParams: { page?: string };
}) => {
  const { getByState, getAllAdmissions } = SettingRscService();

  const nowNavigation = navigation.find((element) => element.state === state);
  let data;

  const currentPage = Number(searchParams.page) || 1;

  nowNavigation
    ? await getByState(
        nowNavigation.exportType!.replace('_USERS', '').trim() as User.UserDto['state'],
        null,
        currentPage - 1,
      ).then((res) => {
        data = {
          content: res.content.map((element) => ({
            ...element,
            userName: element.name,
          })),
          totalPages: res.totalPages,
        };
      })
    : await getAllAdmissions(null, currentPage - 1).then((res) => {
        data = {
          content: res.content.map((element) => ({ ...element })),
          totalPages: res.totalPages,
        };
      });

  return (
    <>
      <Management
        state={state}
        title="유저 관리"
        firstNavigation={{
          name: '가입 대기 유저',
          state: 'admission',
          exportType: 'ADMISSION_USERS',
          router: '/setting/management/user/admission/',
        }}
        totalPages={data.totalPages}
        currentPage={currentPage}
        navigation={navigation}
        data={data.content.map((element) => ({
          userName: element.userName,
          studentId: element.studentId,
          id: element.id,
        }))}
      />
    </>
  );
};

export default UserManagement;
