import axios from 'axios';

import { API } from '@/fsd_shared/configs/api/csrConfig';

const CEREMONY_URI = '/api/v1/ceremony';

export interface CeremonyNotificationSettingDto {
  subscribedAdmissionYears: number[] | null;
  setAll: boolean;
  notificationActive: boolean;
}

export const getCeremonyNotificationSetting = async (): Promise<CeremonyNotificationSettingDto | string> => {
  try {
    const response = await API.get(`${CEREMONY_URI}/notification-setting`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || '알림 설정 조회에 실패했습니다.';
    } else {
      return '알 수 없는 오류가 발생했습니다.';
    }
  }
};
