import { API } from '@/fsd_shared';

export const inactiveBoardNotification = async ({ boardId }: { boardId: string }) => {
  const { data }: { data: Board.ActiveBoardNotificationResponseDto } = await API.delete(
    `/api/v1/boards/subscribe/${boardId}`,
  );
  return data;
};
