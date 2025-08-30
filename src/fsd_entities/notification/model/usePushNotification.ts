import { PushNotifications } from '@capacitor/push-notifications';
import { toast } from 'react-hot-toast';

import { getRccRefresh, STORAGE_KEYS } from '@/fsd_shared/configs';
import { detectDeviceType, getClientFCMToken } from '@/fsd_shared/model';

import { requestNotificationPermission } from '@/fsd_shared';

import { getFCMToken } from '../api';
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

      // --- Capacitor 앱(iOS, Android) 로직 ---

      if (deviceType === 'ios' || deviceType === 'ipad' || deviceType === 'android') {
        const permStatus = await PushNotifications.checkPermissions();
        if (permStatus.receive === 'prompt') {
          await PushNotifications.requestPermissions();
        }

        PushNotifications.addListener('registration', async ({ value }) => {
          const clientFCMToken = value;
          const refreshToken = await getRccRefresh();
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
      } else {
        // --- 웹/웹앱 로직 (Notification.permission 사용) ---

        if (Notification.permission === 'default') {
          const permission = await requestNotificationPermission();
          if (permission !== 'granted') {
            return;
          }
        } else if (Notification.permission === 'denied') {
          return;
        }

        const clientFCMToken = await getClientFCMToken();
        if (!clientFCMToken) {
          toast.error('알림 설정 실패');
          return;
        }

        const { fcmToken } = await getFCMToken();
        const refreshToken = await getRccRefresh();

        if (!fcmToken.includes(clientFCMToken)) {
          if (localStorage.getItem(FCM_TOKEN_KEY) !== clientFCMToken) {
            updateFCMTokenMutation.mutate({ fcmToken: clientFCMToken, refreshToken: refreshToken || '' });
            localStorage.setItem(FCM_TOKEN_KEY, clientFCMToken);
          } else if (localStorage.getItem(FCM_TOKEN_KEY) === clientFCMToken) {
            extendFCMTokenMutation.mutate({ fcmToken: clientFCMToken, refreshToken: refreshToken || '' });
          }
        }
      }
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
