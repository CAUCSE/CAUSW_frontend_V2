import { toast } from 'react-hot-toast';

import { API, getRccAccess } from '@/fsd_shared/configs/api/csrConfig';
import { BASEURL } from '@/fsd_shared/configs/api/url';

export const markAsRead = async (id: string): Promise<void> => {
  const URI = `${BASEURL}/api/v1/notifications/log/isRead/${id}`;

  try {
    await API.post(URI, {}, { headers: { Authorization: getRccAccess() } });
    toast.success(`알림 ${id} 읽음 처리 완료`);
  } catch (error) {
    toast.error(`알림 ${id} 읽음 처리 실패: 서버 응답 오류`);
    throw error;
  }
};
