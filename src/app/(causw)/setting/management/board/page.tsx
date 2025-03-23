import { SettingRscService } from "@/shared";

import { Management } from "@/_deprecated/widget";

const BoardManagement = async () => {
  const { getApplyBoards } = SettingRscService();

  const data = (await getApplyBoards()) as Setting.BoardList;

  return (
    <>
      <Management
        state={undefined}
        title="게시판 생성 신청 관리"
        firstNavigation={{
          name: "생성 신청 게시판",
          state: "",
          router: "/setting/management/board",
        }}
        data={data.map((element) => ({
          userName: element.boardName,
          studentId: element.id,
          id: element.id,
        }))}
      />
    </>
  );
};

export default BoardManagement;
