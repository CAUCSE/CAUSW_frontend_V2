'use client';

import { useRouter } from 'next/navigation';

import { BoardRscService, useBoardStore, useUserStore } from '@/shared';

export const useCreateBoard = () => {
  const router = useRouter();
  const { clearBoardInfo, boardName, setIsNameValid, boardDescription, allowAnonymous, selectedRoles } =
    useBoardStore();
  const { applyBoard, createBoard } = BoardRscService();
  const isPresidents = useUserStore(state => state.isPresidents);
  const isVicePresidents = useUserStore(state => state.isVicePresidents);
  const isAdmin = useUserStore(state => state.isAdmin);
  const hasAuth = isAdmin() || isPresidents() || isVicePresidents();

  const handleSubmit = async () => {
    if (!boardName.trim()) {
      setIsNameValid(false);
      return;
    }
    if (hasAuth) {
      const boardRequest: Board.CreateBoardDto = {
        boardName: boardName,
        description: boardDescription,
        boardCategory: 'APP_NOTICE',
        createRoleList: selectedRoles as User.Role[],
        isAnonymousAllowed: allowAnonymous,
        circleId: null,
      };
      try {
        await createBoard(boardRequest);
        router.back();
        clearBoardInfo();
      } catch (error) {
        throw error;
      }
    } else {
      const boardRequest: Board.ApplyBoardDto = {
        boardName: boardName,
        description: boardDescription,
        isAnonymousAllowed: allowAnonymous,
      };
      try {
        await applyBoard(boardRequest);
        router.back();
        clearBoardInfo();
      } catch (error) {
        throw error;
      }
    }
  };

  return { handleSubmit, hasAuth };
};
