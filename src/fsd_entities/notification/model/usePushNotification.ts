import { PushNotifications } from '@capacitor/push-notifications';
import { toast } from 'react-hot-toast';

import { getRccRefresh, STORAGE_KEYS } from '@/fsd_shared/configs';
import { detectDeviceType } from '@/fsd_shared/model';

import { useUpdateFCMToken } from '../hooks/mutations/useUpdateFCMToken';

const FCM_TOKEN_KEY = STORAGE_KEYS.FCM_TOKEN;
export const usePushNotification = () => {
  const updateFCMTokenMutation = useUpdateFCMToken(true);
  const extendFCMTokenMutation = useUpdateFCMToken(false);

  const compareFCMToken = async (): Promise<void> => {
    try {
      const deviceType = detectDeviceType();
      if (deviceType === 'desktop') {
        return;
      }

      const permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        await PushNotifications.requestPermissions();
      }

      PushNotifications.addListener('registration', async ({ value }) => {
        const clientFCMToken = value;
        const refreshToken = getRccRefresh();
        const localFCMToken = localStorage.getItem(FCM_TOKEN_KEY);

        if (localFCMToken !== clientFCMToken) {
          updateFCMTokenMutation.mutate({ fcmToken: clientFCMToken, refreshToken: refreshToken || '' });
          localStorage.setItem(FCM_TOKEN_KEY, clientFCMToken);
        } else {
          extendFCMTokenMutation.mutate({ fcmToken: clientFCMToken, refreshToken: refreshToken || '' });
        }
      });

      PushNotifications.addListener('registrationError', (error) => {
        toast.error('알림 설정에 실패했습니다.');
      });

      await PushNotifications.register();
    } catch (error) {
      toast.error('알림 설정에서 문제가 발생했습니다.');
    }
  };
  return {
    compareFCMToken,
  };
};

export const resetFCMToken = (): void => {
  localStorage.removeItem(FCM_TOKEN_KEY);
};

export const getLocalFCMToken = (): string | null => {
  return localStorage.getItem(FCM_TOKEN_KEY);
};
