'use client';

import { toast } from 'react-hot-toast';

import { useAuthHandler } from '@/fsd_shared';

import { useCreateCommonBoard, useCreateNoticeBoard } from '../queries';
import { useBoardCreationStore } from '../stores';

export const useCreateBoard = () => {
  const boardName = useBoardCreationStore((state) => state.boardName);
  const { hasAuth } = useAuthHandler();
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
