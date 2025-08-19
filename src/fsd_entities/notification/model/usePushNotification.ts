import { getFCMToken } from '../api/get';
import { updateFCMToken } from '../api/post';
import { toast } from 'react-hot-toast';
import { getRccRefresh, STORAGE_KEYS } from '@/fsd_shared/configs';
import { detectDeviceType, getClientFCMToken } from '@/fsd_shared/model';
import { requestNotificationPermission } from '@/fsd_shared/utils';
import { useUpdateFCMToken } from '../hooks/mutations/useUpdateFCMToken';

const FCM_TOKEN_KEY = STORAGE_KEYS.FCM_TOKEN;

export const usePushNotification = () => {
  const updateFCMTokenMutation = useUpdateFCMToken();
  
  // 토큰 동기화
  const compareFCMToken = async (): Promise<void> => {
    try {
      const deviceType = detectDeviceType();
      if (deviceType === 'desktop') {
        return;
      }

      // 알림 권한 허용되지 않은 경우
      if (Notification.permission === 'default') {
        const permission = await requestNotificationPermission();
        if (permission !== 'granted') {
          return;
        }
      } else if (Notification.permission === 'denied') {
        return;
      }
      // 이미 토큰 동기화 완료된 경우
      if (localStorage.getItem(FCM_TOKEN_KEY)) {
        return;
      }

      // 클라이언트에서 토큰 가져오기
      const clientFCMToken = await getClientFCMToken();

      // 로컬에서 토큰 못 가져오는 경우 
      if (!clientFCMToken) {
        toast.error('알림 설정 실패');
        return;
      }
      
      // 서버에서 현재 사용자의 토큰 조회
      const { fcmToken } = await getFCMToken();
      const refreshToken = await getRccRefresh();
      // 서버에 토큰이 없거나 현재 기기의 토큰과 다른 경우 토큰 전송

      if (!fcmToken.includes(clientFCMToken)) {
        updateFCMTokenMutation.mutate({ fcmToken: clientFCMToken, refreshToken: refreshToken || '' });
        // 로컬스토리지에 토큰 저장
      }
    } catch (error) {
      toast.error('알림 설정에서 문제가 발생했습니다.');
    }
  };

  // 토큰 상태 초기화 함수 (로그아웃 시 사용)
  const resetFCMToken = (): void => {
    localStorage.removeItem(FCM_TOKEN_KEY);
  };

  // 로컬스토리지에서 FCM 토큰 가져오기
  const getLocalFCMToken = (): string | null => {
    return localStorage.getItem(FCM_TOKEN_KEY);
  };

  return {
    requestPushPermission: requestNotificationPermission,
    compareFCMToken,
    resetFCMToken,
    getLocalFCMToken,
  };
};
