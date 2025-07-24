import axios, { AxiosResponse, isAxiosError } from 'axios';
import toast from 'react-hot-toast';

import { API } from '@/fsd_shared';

const CEREMONY_URI = '/api/v1/ceremony';

export const getAdminCeremonyAwaitList = async (page: number, size: number, sort?: string[]) => {
  const URI = `/api/v1/ceremony/list/await`;

  const params = {
    page: page.toString(),
    size: size.toString(),
    ...(sort && { sort: sort.join(',') }),
  };

  try {
    const response = (await API.get(URI, { params })) as AxiosResponse<any>;

    if (response.status !== 200) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.data?.content?.length ? response.data.content : [];
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error('Axios error:', error.response?.data);
    } else {
      toast.error('General error');
    }
    throw error;
  }
};

export const getAdminCeremonyDetail = async (idx: string) => {
  const URI = `/api/v1/ceremony/${idx}`;

  try {
    const response = await API.get(URI);

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
export const getCeremonyNotificationSetting = async (): Promise<Ceremony.CeremonyNotificationSettingDto | string> => {
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
