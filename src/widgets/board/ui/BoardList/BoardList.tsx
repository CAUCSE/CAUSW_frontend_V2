import { fetchBoardList } from '@/entities/board';
import { getMyRoles } from '@/entities/user/api';

import { BoardListClient } from './BoardListClient';

export const BoardList = async () => {
  const roles = await getMyRoles();
  const { defaultBoardForAdmin, defaultBoardForCommon, customBoardForAdmin, customBoardForCommon } =
    await fetchBoardList();

  return (
    <BoardListClient
      roles={roles}
      defaultBoardForAdmin={defaultBoardForAdmin}
      defaultBoardForCommon={defaultBoardForCommon}
      customBoardForAdmin={customBoardForAdmin}
      customBoardForCommon={customBoardForCommon}
    />
  );
};
