'use client';

import axios from 'axios';

import { API, getRccAccess } from '@/fsd_shared/configs/api/csrConfig';

const CEREMONY_URI = '/api/v1/ceremony';

interface NotificationSettingPayload {
  subscribedAdmissionYears: number[] | null;
  setAll: boolean;
  notificationActive: boolean;
}

export const createCeremonyNotificationSetting = async (payload: NotificationSettingPayload) => {
  try {
    const response = await API.post(`${CEREMONY_URI}/notification-setting`, payload, {
      headers: { Authorization: getRccAccess() },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || '알림 설정 생성에 실패했습니다.';
      throw new Error(errorMessage);
    } else {
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
};
