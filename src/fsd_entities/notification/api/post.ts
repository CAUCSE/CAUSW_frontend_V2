'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';

import { getRccAccess } from '@/fsd_shared/configs/api/csrConfig';

import { API, FORMAPI } from '@/shared';
import { createFormData } from '@/utils';
import { CeremonyResponse, CreateCeremonyPayload } from "@/fsd_entities/notification/config/types";

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

export const updateFCMToken = async (token: string): Promise<void> => {
  const URI = `/api/v1/users/fcm?token=${token}`;
  try {
    await API.post(URI);
  } catch (error) {
    toast.error('FCM 토큰 업데이트 실패: 서버 응답 오류');
    throw error;
  }
};


export const addCeremony = async (payload: CreateCeremonyPayload): Promise<CeremonyResponse> => {
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
