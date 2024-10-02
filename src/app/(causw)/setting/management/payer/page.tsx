import { SettingRscService } from "@/shared";

import { Management } from "@/widget";

const PayerManagement = async () => {
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
      <div className="absolute right-4 top-6 flex h-10 w-36 items-center justify-center rounded-2xl border-2 border-black bg-focus text-lg text-white md:right-52 md:top-16">
        납부자 추가
      </div>
      <Management
        state={undefined}
        title="학생회비 관리"
        firstNavigation={{
          name: "학생회비 납부자 목록",
          state: "",
          exportType: "PAYERS",
        }}
        data={data}
      />
    </>
  );
};

export default PayerManagement;