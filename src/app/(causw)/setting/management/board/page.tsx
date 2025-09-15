import { getApplyBoards } from '@/entities/user/api';
import { ManagementPanel } from '@/entities/user/ui';

const BoardManagement = async () => {
  const data = (await getApplyBoards()) as Setting.BoardList;

  return (
    <>
      <ManagementPanel
        state={undefined}
        title="게시판 생성 신청 관리"
        firstNavigation={{
          name: '생성 신청 게시판',
          state: '',
          router: '/setting/management/board',
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
