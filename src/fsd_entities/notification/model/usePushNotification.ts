import { getMessaging, getToken } from 'firebase/messaging';

import { getFCMToken } from '../api/get';
import { updateFCMToken } from '../api/post';

const FCM_CHECKED_KEY = 'fcm_checked';

export type DeviceType = 'android' | 'ios' | 'ipad' | 'desktop';

export const usePushNotification = () => {
  const getDeviceType = (): DeviceType => {
    const ua = navigator.userAgent.toLowerCase();

    // Android
    if (/android/.test(ua)) return 'android';

    // iPhone, iPod
    if (/iphone|ipod/.test(ua)) return 'ios';

    // iPad (modern iPadOS가 userAgent에 Mac처럼 보이는 경우도 커버)
    const isIpad = /ipad/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (isIpad) return 'ipad';

    return 'desktop';
  };

  // 알림 권한 요청
  const requestPushPermission = async (): Promise<NotificationPermission> => {
    if (Notification.permission === 'granted') {
      return 'granted';
    } else if (Notification.permission === 'denied') {
      return 'denied';
    } else {
      return await Notification.requestPermission();
    }
  };

  // FCM 토큰 가져오기
  const getClientFCMToken = async (): Promise<string | null> => {
    try {
      // 권한 요청
      const permission = await requestPushPermission();
      if (permission !== 'granted') {
        return null;
      }

      const messaging = getMessaging();
      const currentToken = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FB_VAPID_KEY,
      });

      if (!currentToken) {
        return null;
      }
      // 토큰이 있는 경우 저장
      return currentToken;
    } catch {
      throw new Error('Failed to get FCM token: Unknown error');
    }
  };

  // 토큰 동기화
  const compareFCMToken = async (): Promise<void> => {
    try {
      const deviceType = getDeviceType();
      if (deviceType === 'desktop') {
        return;
      }

      // 이미 체크된 경우 스킵
      const checked = localStorage.getItem(FCM_CHECKED_KEY);
      if (checked) {
        return;
      }
      localStorage.setItem(FCM_CHECKED_KEY, 'true');

      // 알림 권한 요청
      await Notification.requestPermission();

      if (Notification.permission !== 'granted') {
        return;
      }

      // 클라이언트에서 토큰 가져오기
      const clientFCMToken = await getClientFCMToken();

      // 로컬에서 토큰 못 가져오는 경우 early return
      if (!clientFCMToken) {
        return;
      }

      // 서버에서 현재 사용자의 토큰 조회
      const serverFCMToken = await getFCMToken();

      // 서버에 토큰이 없거나 현재 기기의 토큰과 다른 경우 토큰 전송
      if (!serverFCMToken || !serverFCMToken.includes(clientFCMToken)) {
        await updateFCMToken(clientFCMToken);
      }
    } catch (error) {}
  };

  // 토큰 상태 초기화 함수 (로그아웃 시 사용)
  const resetFCMToken = (): void => {
    localStorage.removeItem(FCM_CHECKED_KEY);
  };

  return {
    getDeviceType,
    requestPushPermission,
    compareFCMToken,
    resetFCMToken,
  };
};
