'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';

import { STORAGE_KEYS } from '@/shared/configs';
import { API, FORMAPI } from '@/shared';
import { createFormData } from '@/utils';

const CEREMONY_URI = '/api/v1/ceremony';
const FCM_TOKEN_KEY = STORAGE_KEYS.FCM_TOKEN;

export const markAsRead = async (id: string): Promise<void> => {
  const URI = `/api/v1/notifications/log/isRead/${id}`;

  try {
    await API.post(URI);
  } catch (error) {
    toast.error(`알림 ${id} 읽음 처리 실패: 서버 응답 오류`);
    throw error;
  }
};

export const updateFCMToken = async (payload: Notification.UpdateFCMTokenRequestDto): Promise<void> => {
  const URI = `/api/v1/users/fcm`;
  await API.post(URI, payload);
  localStorage.setItem(FCM_TOKEN_KEY, payload.fcmToken);
};

export const addCeremony = async (payload: Ceremony.CreateCeremonyPayload): Promise<Ceremony.CeremonyResponse> => {
  try {
    const dto = {
      ...payload,
      imageFileList: undefined,
    };

    const formData = createFormData(
      dto,
      'createCeremonyRequestDTO',
      payload.imageFileList ? Array.from(payload.imageFileList) : [],
      'imageFileList',
    );

    const { data } = await FORMAPI.post(CEREMONY_URI, formData);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || '경조사 등록에 실패했습니다.';
      throw new Error(errorMessage);
    } else {
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
};
