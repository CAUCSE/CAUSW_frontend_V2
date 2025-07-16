'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { ceremonyQueryKey } from '../queries/ceremonyQueryKey';
import { createCeremonyNotificationSetting, updateCeremonySetting } from "@/fsd_entities/ceremony";

export const useCeremonySettingMutation = (
  isUpdate: boolean,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Ceremony.NotificationSettingPayload) => {
      return isUpdate ? updateCeremonySetting(payload) : createCeremonyNotificationSetting(payload);
    },
    onSuccess: () => {
      toast.success('설정이 저장되었습니다.');
      queryClient.invalidateQueries({ queryKey: ceremonyQueryKey.setting() });
    },
    onError: () => {
      toast.error('알림 설정 저장에 실패했습니다.');
    },
  });
};
