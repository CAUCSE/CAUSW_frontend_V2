import { AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';

import { API, getRccAccess } from '@/fsd_shared/configs/api/csrConfig';
import { BASEURL } from '@/fsd_shared/configs/api/url';

import { Notification } from '../config/types';

export const getNotifications = async (): Promise<Notification[]> => {
  const URI = `${BASEURL}/api/v1/notifications/log/general/top4`;

  try {
    const response: AxiosResponse<Notification[]> = await API.get(URI, {
      headers: { Authorization: getRccAccess() },
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch notifications');
    }

    return response.data;
  } catch (error) {
    toast.error('알림 가져오기 실패: 서버 응답 오류');
    throw error;
  }
};

export const getCeremonyNotifications = async (): Promise<Notification[]> => {
  const URI = `${BASEURL}/api/v1/notifications/log/ceremony/top4`;

  try {
    const response: AxiosResponse<Notification[]> = await API.get(URI, {
      headers: { Authorization: getRccAccess() },
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch ceremony notifications');
    }

    return response.data;
  } catch (error) {
    toast.error('경조사 알림 가져오기 실패: 서버 응답 오류');
    throw error;
  }
};
