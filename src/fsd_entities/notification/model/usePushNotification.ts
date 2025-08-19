import { getFCMToken } from '../api/get';
import { updateFCMToken } from '../api/post';
import { toast } from 'react-hot-toast';
import { getRccRefresh, STORAGE_KEYS } from '@/fsd_shared/configs';
import { detectDeviceType, getClientFCMToken } from '@/fsd_shared/model';
import { requestNotificationPermission } from '@/fsd_shared/utils';
import { useUpdateFCMToken } from '../hooks/mutations/useUpdateFCMToken';

const FCM_TOKEN_KEY = STORAGE_KEYS.FCM_TOKEN;

export const usePushNotification = () => {
  const updateFCMTokenMutation = useUpdateFCMToken(true);
  const extendFCMTokenMutation = useUpdateFCMToken(false);
  
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

      // 로컬 스토리지에 토큰이 없어서 새로 요청을 보내야 하는 경우
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
        
        // 로컬 스토리지에 기존 값이 없었을 경우 토큰 전송하고 toast까지
        if (localStorage.getItem(FCM_TOKEN_KEY) !== clientFCMToken) {
          updateFCMTokenMutation.mutate({ fcmToken: clientFCMToken, refreshToken: refreshToken || '' });
          localStorage.setItem(FCM_TOKEN_KEY, clientFCMToken);
        }
        // 로컬 스토리지에 기존 값이 있었을 경우 toast 없이 보내기
        else if (localStorage.getItem(FCM_TOKEN_KEY) === clientFCMToken) {
          extendFCMTokenMutation.mutate({ fcmToken: clientFCMToken, refreshToken: refreshToken || '' });
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


// 토큰 상태 초기화 함수 (로그아웃 시 사용)
export const resetFCMToken = (): void => {
  localStorage.removeItem(FCM_TOKEN_KEY);
};

// 로컬스토리지에서 FCM 토큰 가져오기
export const getLocalFCMToken = (): string | null => {
  return localStorage.getItem(FCM_TOKEN_KEY);
};
