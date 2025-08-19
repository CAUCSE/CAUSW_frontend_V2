'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateFCMToken } from '@/fsd_entities/notification/api';

export const useUpdateFCMToken = () => {

	return useMutation({
		mutationFn: (payload: Notification.UpdateFCMTokenRequestDto) => updateFCMToken(payload),
		onSuccess: () => {
			toast.success('알림 설정을 허용하였습니다.');
		},
		onError: () => {
			toast.error('알림 설정 실패');
		},
	});
};