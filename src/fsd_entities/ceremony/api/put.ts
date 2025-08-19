import axios, { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

import { API } from '@/fsd_shared';

const CEREMONY_URI = '/api/v1/ceremony';

export const updateCeremonySetting = async (payload: Ceremony.NotificationSettingPayload) => {
  try {
    const { data } = await API.put(`${CEREMONY_URI}/notification-setting`, payload);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || '설정 저장 실패';
      throw new Error(errorMessage);
    } else {
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
};
