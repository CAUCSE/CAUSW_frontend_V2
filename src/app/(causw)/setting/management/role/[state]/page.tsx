import { SettingRscService } from "@/shared";

import { Management } from "@/widget";

const navigation = [
  {
    name: "부학생회장",
    state: "vicepresident",
    router: "/setting/mandate/vice_president",
  },
  { name: "학생회", state: "council", router: "/setting/mandate/council" },
  { name: "학년대표", state: "leader", router: "/setting/mandate/leader" },
  {
    name: "동아리장",
    state: "circleleader",
    router: "/setting/mandate/leader_circle",
  },
  {
    name: "동문회장",
    state: "alumunileader",
    router: "/setting/mandate/president/leader_alumni",
  },
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

  const data = [
    { userName: "강민규", studentId: "20203128", id: "1" },
    { userName: "윤민규", studentId: "20203128", id: "2" },
  ];

  return (
    <>
      <Management
        state={state}
        title="권한 관리"
        firstNavigation={{
          name: "학생회장",
          state: "president",
          router: "/setting/mandate/president",
        }}
        navigation={navigation}
        data={data}
      />
    </>
  );
};

export default RoleManagement;
