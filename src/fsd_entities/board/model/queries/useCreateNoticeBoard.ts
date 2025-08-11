'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import { roles } from '@/fsd_shared';
import { createNoticeBoard } from '../../api';
import { useBoardCreationStore } from '../stores';

export const useCreateNoticeBoard = () => {
  const router = useRouter();
  const {
    boardName,
    boardDescription,
    allowAnonymous,
    isAlumni,
    selectedRoleList,
    resetBoardCreation
  } = useBoardCreationStore(
    useShallow((state) => ({
      boardName: state.boardName,
      boardDescription: state.boardDescription,
      allowAnonymous: state.allowAnonymous,
      isAlumni: state.isAlumni,
      selectedRoleList: state.selectedRoleList,
      resetBoardCreation: state.resetBoardCreation,
    })),
  );

  const roleList: User.Role[] = selectedRoleList.includes('ALL')
    ? Object.values(roles).flat()
    : (selectedRoleList as User.Role[]);

  return useMutation({
    mutationFn: () =>
      createNoticeBoard({
        boardName,
        description: boardDescription,
        boardCategory: 'APP_NOTICE',
        createRoleList: roleList,
        isAnonymousAllowed: allowAnonymous,
        isAlumni: isAlumni,
      }),
    onSuccess: () => {
      toast.success('게시판 생성 성공');
      setTimeout(() => {
        router.back();
        resetBoardCreation();
      }, 300);
    },
    onError: (error: Error) => {
      toast.error(error.message || '게시판 생성에 실패했습니다');
    },
  });
};
