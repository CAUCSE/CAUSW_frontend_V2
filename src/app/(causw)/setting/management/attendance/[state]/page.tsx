import { UserRscService } from "@/shared";

import { Management } from "@/widget";

const AttendanceManagement = async ({
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
    <>
      <div className="absolute right-4 top-6 flex h-10 w-48 items-center justify-center rounded-2xl border-2 border-black text-lg md:right-52 md:top-16">
        재학 인증 일괄 요청
      </div>
      <Management
        state={state}
        title="학적 상태 관리"
        firstNavigation={{ name: "유저 목록", state: "all" }}
        navigation={[{ name: "승인 대기 목록", state: "waiting" }]}
        data={data}
        exportHandler={() => {}}
      />
    </>
  );
};

export default AttendanceManagement;
