import { PushNotifications } from '@capacitor/push-notifications';
import { toast } from 'react-hot-toast';

import { getRccRefresh, STORAGE_KEYS } from '@/fsd_shared/configs';
import { detectDeviceType, getClientFCMToken } from '@/fsd_shared/model';
import { requestNotificationPermission } from '@/fsd_shared/utils';

import { getFCMToken } from '../api/get';
import { updateFCMToken } from '../api/post';
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
      // --- ios 및 기타 환경 로직 ---
      if (deviceType === 'ios' || deviceType === 'ipad') {
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
        // PushNotifications.addListener('pushNotificationReceived', (notification) => {
        //   console.log('푸시 알림 수신:', notification);
        // });

        // PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
        //   console.log('푸시 알림 탭 했을 때 액션:', action);
        // });
        await PushNotifications.register();
      } else {
        // --- 안드로이드 및 기타 환경 로직 ---
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
