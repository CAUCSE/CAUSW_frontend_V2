import { SettingRscService } from "@/shared";
import { Management } from "@/widget";

const navigation: {
  name: string;
  state: string;
  router: string;
  exportType?: Setting.ExportType;
}[] = [
  {
    name: "가입 거부 유저",
    state: "drop",
    exportType: "DROP_USERS",
    router: "/setting/management/user/TODO",
  },
  {
    name: "활성 유저",
    state: "active",
    exportType: "ACTIVE_USERS",
    router: "/setting/management/user/TODO",
  },
  {
    name: "추방 유저",
    state: "inactive_n_drop",
    exportType: "INACTIVE_N_DROP_USERS",
    router: "/setting/management/user/TODO",
  },
  {
    name: "탈퇴 유저",
    state: "inactive",
    exportType: "INACTIVE_USERS",
    router: "/setting/management/user/TODO",
  },
];

const UserManagement = async ({
  params: { state },
}: {
  params: { state: string };
}) => {
  const { getByState, getAllAdmissions } = SettingRscService();

  /* const data = isAddmission
    ? await getAllAdmissions(null, 0)
    : await getByState(state.toUpperCase() as User.UserDto["state"], null, 0); */

  const data = [
    { userName: "강민규", studentId: "20203128", id: "1" },
    { userName: "윤민규", studentId: "20203128", id: "2" },
  ];

  return (
    <Management
      state={state}
      title="유저 관리"
      firstNavigation={{
        name: "가입 대기 유저",
        state: "admission",
        exportType: "ADMISSION_USERS",
        router: "/setting/management/user/TODO",
      }}
      navigation={navigation}
      data={data}
    />
  );
};

export default UserManagement;
