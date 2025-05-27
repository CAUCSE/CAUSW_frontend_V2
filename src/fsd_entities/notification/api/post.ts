'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';

import { getRccAccess } from '@/fsd_shared/configs/api/csrConfig';

import { API } from '@/shared';

const CEREMONY_URI = '/api/v1/ceremony';

interface NotificationSettingPayload {
  subscribedAdmissionYears: number[] | null;
  setAll: boolean;
  notificationActive: boolean;
}

export const createCeremonyNotificationSetting = async (payload: NotificationSettingPayload) => {
  try {
    const { data } = await API.post(`${CEREMONY_URI}/notification-setting`, payload);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || '알림 설정 생성에 실패했습니다.';
      throw new Error(errorMessage);
    } else {
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
};

export const markAsRead = async (id: string): Promise<void> => {
  const URI = `/api/v1/notifications/log/isRead/${id}`;

  try {
    await API.post(URI, {}, { headers: { Authorization: getRccAccess() } });
    toast.success(`알림 ${id} 읽음 처리 완료`);
  } catch (error) {
    toast.error(`알림 ${id} 읽음 처리 실패: 서버 응답 오류`);
    throw error;
  }
};

interface CreateCeremonyResponse {
  id: string;
  description: string;
  startDate: string;
  endDate: string;
  category: string;
  ceremonyState: string;
  attachedImageUrlList: string[];
  note?: string;
}

export const createCeremony = async (formData: FormData): Promise<CreateCeremonyResponse> => {
  try {
    const { data } = await API.post<CreateCeremonyResponse>('/api/v1/ceremony', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || '경조사 생성에 실패했습니다.';
      throw new Error(errorMessage);
    } else {
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
};
export const updateFCMToken = async (token: string): Promise<void> => {
  const URI = `/api/v1/users/fcm?token=${token}`;
  try {
    await API.post(URI);
  } catch (error) {
    toast.error('FCM 토큰 업데이트 실패: 서버 응답 오류');
    throw error;
  }
};
interface CreateCeremonyResponse {
  id: string;
  description: string;
  startDate: string;
  endDate: string;
  category: string;
  ceremonyState: string;
  attachedImageUrlList: string[];
  note?: string;
}

// export const createCeremony = async (formData: FormData): Promise<CreateCeremonyResponse> => {
//   try {
//     const { data } = await API.post<CreateCeremonyResponse>('/api/v1/ceremony', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       const errorMessage = error.response?.data?.message || '경조사 생성에 실패했습니다.';
//       throw new Error(errorMessage);
//     } else {
//       throw new Error('알 수 없는 오류가 발생했습니다.');
//     }
//   }
// };
