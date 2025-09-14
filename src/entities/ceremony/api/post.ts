import axios, { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

import { API } from '@/shared';

const CEREMONY_URI = '/api/v1/ceremony';

export const cancelCeremonyRegist = async ({ ceremonyId }: { ceremonyId: string }) => {
  const URI = `/api/v1/ceremony/state/close/${ceremonyId}`;
  try {
    const response = await API.put(URI);
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

export const updateAdminCeremonyState = async ({
  ceremonyId,
  targetCeremonyState,
  rejectMessage,
}: {
  ceremonyId: string;
  targetCeremonyState: 'ACCEPT' | 'REJECT' | 'AWAIT' | 'CLOSE';
  rejectMessage?: string;
}) => {
  const URI = `/api/v1/ceremony/state`;
  try {
    const response = await API.put(URI, {
      ceremonyId,
      targetCeremonyState,
      rejectMessage,
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

export const createCeremonyNotificationSetting = async (payload: Ceremony.NotificationSettingPayload) => {
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
