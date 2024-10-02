import { SettingRscService } from "@/shared";

import { Management } from "@/widget";

const PayerManagement = async () => {
  const { getByState, getAllAdmissions } = SettingRscService();

  /* const data = isAddmission
    ? await getAllAdmissions(null, 0)
    : await getByState(state.toUpperCase() as User.UserDto["state"], null, 0); */

  const data = [
    { userName: "강민규", studentId: "20203128", id: "1", router: "" },
    { userName: "윤민규", studentId: "20203128", id: "2", router: "" },
  ];

  return (
    <>
      <Management
        state={undefined}
        title="게시판 생성 신청 관리"
        firstNavigation={{
          name: "생성 신청 게시판",
          state: "",
          router: "/setting/management/TODO",
        }}
        data={data}
      />
    </>
  );
};

export default PayerManagement;
