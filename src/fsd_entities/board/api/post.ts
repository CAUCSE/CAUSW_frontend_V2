import { isAxiosError } from 'axios';

import { API } from '@/shared';

interface CreateNoticeBoardDto {
  boardName: string;
  description: string;
  boardCategory?: 'APP_NOTICE' | 'APP_FREE';
  createRoleList: User.Role[];
  isAnonymousAllowed: boolean;
  circleId?: string;
}

export const createNoticeBoard = async (payload: CreateNoticeBoardDto): Promise<void> => {
  try {
    await API.post('/api/v1/boards/create', payload);
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || '게시판 생성에 실패했습니다');
    }
    throw new Error('게시판 생성에 실패했습니다');
  }
};

interface CreateCommonBoardDto {
  boardName: string;
  description: string;
  isAnonymousAllowed: boolean;
  circleId?: string;
}

export const createCommonBoard = async (payload: CreateCommonBoardDto): Promise<void> => {
  try {
    await API.post('/api/v1/boards/apply', payload);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || '게시판 생성에 실패했습니다');
    }
    throw new Error('게시판 생성에 실패했습니다');
  }
};

export const activeBoardNotification = async ({ boardId }: { boardId: string }) => {
  const { data }: { data: Board.ActiveBoardNotificationResponseDto } = await API.post(
    `/api/v1/boards/subscribe/${boardId}`,
  );
  return data;
};
