import { fetchBoardList } from '@/fsd_entities/board';
import { getMyRoles } from '@/fsd_entities/user/api';

import { BoardListClient } from './BoardListClient';

export const BoardList = async () => {
  const roles = await getMyRoles();
  const {
    defaultBoardForAdmin,
    defaultBoardForCommon,
    customBoardForAdmin,
    customBoardForCommon,
    defaultBoardForGraduate,
    customBoardForGraduate,
    sortedBoardList,
  } = await fetchBoardList();

  return (
    <BoardListClient
      roles={roles}
      defaultBoardForAdmin={defaultBoardForAdmin}
      defaultBoardForCommon={defaultBoardForCommon}
      customBoardForAdmin={customBoardForAdmin}
      customBoardForCommon={customBoardForCommon}
      defaultBoardForGraduate={defaultBoardForGraduate}
      customBoardForGraduate={customBoardForGraduate}
      sortedBoardList={sortedBoardList}
    />
  );
};
