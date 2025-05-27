import axios, { AxiosResponse, isAxiosError } from 'axios';
import { toast } from 'react-hot-toast';

import { getRccAccess } from '@/fsd_shared/configs/api/csrConfig';

import { API } from '@/fsd_shared';

import { CeremonyResponse, Notification } from '../config/types';

const CEREMONY_URI = '/api/v1/ceremony';

export interface CeremonyNotificationSettingDto {
  subscribedAdmissionYears: number[] | null;
  setAll: boolean;
  notificationActive: boolean;
}

export const getCeremonyNotificationSetting = async (): Promise<CeremonyNotificationSettingDto | string> => {
  try {
    const { data } = await API.get(`${CEREMONY_URI}/notification-setting`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || '알림 설정 조회에 실패했습니다.';
    } else {
      return '알 수 없는 오류가 발생했습니다.';
    }
  }
};

export const getNotifications = async (): Promise<Notification[]> => {
  const URI = `/api/v1/notifications/log/general/top4`;

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
  const URI = `/api/v1/notifications/log/ceremony/top4`;

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

export const getCeremonies = async (
  ceremonyState: 'ACCEPT' | 'REJECT' | 'AWAIT' | 'CLOSE' = 'ACCEPT',
  pageNum: number = 0,
): Promise<CeremonyResponse> => {
  try {
    const response: AxiosResponse<CeremonyResponse> = await API.get(CEREMONY_URI, {
      params: {
        ceremonyState,
        pageNum,
      },
    });

    return response.data;
  } catch (error) {
    toast.error('경조사 목록 가져오기 실패');
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

    if (response.status !== 200) {
      throw new Error(`Error: ${response.status}`);
    }

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

    if (response.status !== 200) {
      throw new Error(`Error: ${response.status}`);
    }

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
