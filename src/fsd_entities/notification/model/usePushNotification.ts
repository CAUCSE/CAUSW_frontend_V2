import { getFCMToken } from '../api/get';
import { updateFCMToken } from '../api/post';
import { toast } from 'react-hot-toast';
import { STORAGE_KEYS } from '@/fsd_shared/configs';
import { detectDeviceType, getClientFCMToken } from '@/fsd_shared/model';
import { requestNotificationPermission } from '@/fsd_shared/utils';

const FCM_CHECKED_KEY = STORAGE_KEYS.FCM_CHECKED;

export const usePushNotification = () => {

  // 토큰 동기화
  const compareFCMToken = async (): Promise<void> => {
    try {
      const deviceType = detectDeviceType();
      if (deviceType === 'desktop') {
        return;
      }
      
      // 알림 권한 granted 아닌
      if (Notification.permission === 'default') {
        const permission = await requestNotificationPermission();
        if (permission !== 'granted') {
          return;
        }
      } else if (Notification.permission === 'denied') {
        return;
      }

      // 클라이언트에서 토큰 가져오기
      const clientFCMToken = await getClientFCMToken();

      // 로컬에서 토큰 못 가져오는 경우 early return
      if (!clientFCMToken) {
        toast.error('알림 설정 실패');
        return;
      }

      // 서버에서 현재 사용자의 토큰 조회
      const { fcmToken } = await getFCMToken();

      // 서버에 토큰이 없거나 현재 기기의 토큰과 다른 경우 토큰 전송
      if (!fcmToken.includes(clientFCMToken)) {
        await updateFCMToken(clientFCMToken);
        toast.success('알림 설정을 허용하였습니다.');
      } 
    } catch (error) {
      return ;
    }
  };

  // 토큰 상태 초기화 함수 (로그아웃 시 사용)
  const resetFCMToken = (): void => {
    localStorage.removeItem(FCM_CHECKED_KEY);
  };

  return {
    requestPushPermission: requestNotificationPermission,
    compareFCMToken,
    resetFCMToken,
  };
};
