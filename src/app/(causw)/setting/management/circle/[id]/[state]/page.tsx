import { CircleRscService } from "@/shared";

import { Management } from "@/widget";

const CircleManagement = async ({
  params: { state, id },
}: {
  params: { state: string; id: string };
}) => {
  const { getCircleUsersByState } = CircleRscService();

  const data = await getCircleUsersByState(
    id,
    state === "apply" ? "AWAIT" : "MEMBER",
  );

  return (
    <>
      <Management
        state={state}
        title="동아리원 관리"
        firstNavigation={{
          name: "동아리원 목록",
          state: "member",
          exportType: "CIRCLE_MEMBERS",
          router: "/setting/management/circle/TODO",
        }}
        navigation={[
          {
            name: "동아리 신청 유저 목록",
            state: "apply",
            exportType: "CIRCLE_APPLY_USERS",
            router: "/setting/management/circle/TODO",
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
