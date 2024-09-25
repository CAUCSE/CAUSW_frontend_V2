import { SettingRscService } from "@/shared";

import { Management } from "@/widget";

const navigation = [
  { name: "부학생회장", state: "vicepresident" },
  { name: "학생회", state: "council" },
  { name: "학년대표", state: "leader" },
  { name: "동아리장", state: "circleleader" },
  { name: "동문회장", state: "alumunileader" },
];

const RoleManagement = async ({
  params: { state },
}: {
  params: { state: string };
}) => {
  const { getByState, getAllAdmissions } = SettingRscService();

  /* const data = isAddmission
    ? await getAllAdmissions(null, 0)
    : await getByState(state.toUpperCase() as User.UserDto["state"], null, 0); */

  const headers = [
    { label: "이름", key: "userName" },
    { label: "학번", key: "studentId" },
  ];

  const data = [
    { userName: "강민규", studentId: "20203128", id: "1" },
    { userName: "윤민규", studentId: "20203128", id: "2" },
  ];

  return (
    <>
      <Management
        state={state}
        title="권한 관리"
        firstNavigation={{ name: "학생회장", state: "president" }}
        navigation={navigation}
        data={data}
      />
    </>
  );
};

export default RoleManagement;
