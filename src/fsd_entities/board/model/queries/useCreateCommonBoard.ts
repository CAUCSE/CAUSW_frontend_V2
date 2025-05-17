'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import { createCommonBoard } from '../../api';
import { useBoardCreationStore } from '../stores';

export const useCreateCommonBoard = () => {
  const { boardName, description, isAnonymousAllowed, resetBoardCreation } = useBoardCreationStore(
    useShallow((state) => ({
      boardName: state.boardName,
      description: state.boardDescription,
      isAnonymousAllowed: state.allowAnonymous,
      resetBoardCreation: state.resetBoardCreation,
    })),
  );
  const router = useRouter();
  return useMutation({
    mutationFn: () =>
      createCommonBoard({
        boardName,
        description,
        isAnonymousAllowed,
      }),
    onSuccess: () => {
      toast.success('게시판 생성 신청 성공');
      setTimeout(() => {
        router.back();
        resetBoardCreation();
      }, 300);
    },
    onError: (error: Error) => {
      toast.error(error.message ?? '게시판 생성 신청에 실패했습니다');
    },
  });
};
