import axios, { AxiosResponse, isAxiosError } from 'axios';
import { toast } from 'react-hot-toast';

import { CeremonyState } from '@/fsd_widgets/ceremony';

import { getRccAccess } from '@/fsd_shared/configs/api/csrConfig';

import { API } from '@/shared';

const CEREMONY_URI = '/api/v1/ceremony';

export const getNotifications = async (): Promise<Notification[]> => {
  const URI = `/api/v1/notifications/log/general/top4`;

  try {
    const response: AxiosResponse<Notification[]> = await API.get(URI, {
      headers: { Authorization: getRccAccess() },
    });

    return response.data;
  } catch (error) {
    toast.error('알림 가져오기 실패: 서버 응답 오류');
    throw error;
  }
};

export const getCeremonyNotifications = async (): Promise<Notification[]> => {
  const URI = `/api/v1/notifications/log/ceremony/top4`;

  try {
    const response: AxiosResponse<Notification[]> = await API.get(URI, {
      headers: { Authorization: getRccAccess() },
    });

    return response.data;
  } catch (error) {
    toast.error('경조사 알림 가져오기 실패: 서버 응답 오류');
    throw error;
  }
};

export const getCeremonyData = async (
  ceremonyState: CeremonyState = CeremonyState.ACCEPT,
  pageNum: number = 0,
): Promise<Ceremony.CeremonyResponse> => {
  try {
    const response = await API.get(CEREMONY_URI, {
      params: {
        ceremonyState,
        pageNum,
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error('경조사 데이터를 불러오는데 실패했습니다.', error.response?.data);
    } else {
      toast.error('알 수 없는 오류가 발생했습니다.');
    }
    throw error;
  }
};

export const getFCMToken = async (): Promise<string | null> => {
  const URI = `/api/v1/users/fcm`;

  try {
    const response: AxiosResponse<string> = await API.get(URI);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getNotificationData = async (pageNum: number = 0): Promise<Notification.NotificationResponse> => {
  const URI = `/api/v1/notifications/log/general`;

  try {
    const response = await API.get(URI, {
      params: {
        pageNum,
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error('Axios error:', error.response?.data);
    } else {
      toast.error('General error');
    }
    throw error;
  }
};
export const getCeremonyNotificationData = async (pageNum: number = 0): Promise<Notification.NotificationResponse> => {
  const URI = `/api/v1/notifications/log/ceremony`;

  try {
    const response = await API.get(URI, {
      params: {
        pageNum,
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error('Axios error:', error.response?.data);
    } else {
      toast.error('General error');
    }
    throw error;
  }
};
