'use client';

import { toast } from 'react-hot-toast';

import { useUserStore } from '@/shared';

import { useCreateCommonBoard, useCreateNoticeBoard } from '../queries';
import { useBoardCreationStore } from '../stores';

export const useCreateBoard = () => {
  const boardName = useBoardCreationStore(state => state.boardName);
  const userRole = useUserStore(state => state.roles);
  const hasAuth = userRole.includes('ADMIN') || userRole.includes('PRESIDENT') || userRole.includes('VICE_PRESIDENT');
  const { mutate: createNoticeBoard } = useCreateNoticeBoard();
  const { mutate: createCommonBoard } = useCreateCommonBoard();

  const handleSubmit = async () => {
    if (boardName.trim() === '') {
      toast.error('게시판 이름을 입력해주세요.');
      return;
    }
    hasAuth ? createNoticeBoard() : createCommonBoard();
  };

  return { handleSubmit, hasAuth };
};
