import { initializeApp, getApps, getApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { FIREBASE_CONFIG } from '@/shared/configs';

// Firebase app 초기화 또는 기존 app 가져오기
const getFirebaseApp = () => {
  const apps = getApps();
  if (apps.length === 0) {
    // vapidKey를 제외한 설정으로 Firebase 초기화
    const { vapidKey, ...firebaseConfig } = FIREBASE_CONFIG;
    return initializeApp(firebaseConfig);
  }
  return getApp();
};

export const getClientFCMToken = async (): Promise<string | null> => {
  try {
    const app = getFirebaseApp();
    const messaging = getMessaging(app);
    const currentToken = await getToken(messaging, {
      vapidKey: FIREBASE_CONFIG.vapidKey,
    });
    if (!currentToken) {
      return null;
    }
    return currentToken;
  } catch (e) {
    return null;
  }
};