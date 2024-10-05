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
  const { getPrivilegedUsers } = SettingRscService();

  const allRoles = await getPrivilegedUsers();

  //TODO: 가독성 수정 필요
  const data =
    state === "vicepresident"
      ? allRoles.vicePresidentUser
      : state === "council"
        ? allRoles.councilUsers
        : state === "leader"
          ? allRoles.leaderGradeUsers
          : state === "circleleader"
            ? allRoles.leaderCircleUsers
            : state === "alumunileader"
              ? allRoles.leaderAlumni
              : allRoles.presidentUser;

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
        data={data.map((element) => ({
          userName: element.name,
          studentId: element.studentId,
          id: element.id,
        }))}
      />
    </>
  );
};

export default RoleManagement;
