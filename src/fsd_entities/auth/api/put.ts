import { API } from '@/fsd_shared';

const URI = '/api/v1/users';

export const recoverAccount = async (
  email: User.RecoverAccountRequestDto,
): Promise<{ accessToken: string; refreshToken: string }> => {
  const response = await API.put(`${URI}/recover`, email);

  return response.data;
};
