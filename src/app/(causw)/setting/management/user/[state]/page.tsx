import { UserRscService } from "@/shared";
import { Management } from "@/widget";

const navigation = [
  { name: "가입 거부 유저", state: "drop" },
  { name: "활성 유저", state: "active" },
  { name: "추방 유저", state: "inactive_n_drop" },
  { name: "탈퇴 유저", state: "inactive" },
];

const UserManagement = async ({
  params: { state },
}: {
  params: { state: string };
}) => {
  const { findByState, findAllAdmissions } = UserRscService();

  /* const data = isAddmission
    ? await findAllAdmissions(null, 0)
    : await findByState(state.toUpperCase() as User.UserDto["state"], null, 0); */

  const headers = [
    { label: "이름", key: "userName" },
    { label: "학번", key: "studentId" },
  ];

  const data = [
    { userName: "강민규", studentId: "20203128", id: "1" },
    { userName: "윤민규", studentId: "20203128", id: "2" },
  ];

  return (
    <Management
      state={state}
      title="유저 관리"
      firstNavigation={{ name: "가입 대기 유저", state: "admission" }}
      navigation={navigation}
      data={data}
      exportHandler={() => {}}
    />
  );
};

export default UserManagement;
