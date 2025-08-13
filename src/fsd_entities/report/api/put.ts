import { API } from '@/fsd_shared';

const URI = '/api/v1/users';

export const dropUser = async (userId: string, reason: string) => {
  const res = await API.put<void>(`${URI}/${userId}/drop`, reason, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};
