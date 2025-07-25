import { getMessaging, getToken } from 'firebase/messaging';
import { FIREBASE_CONFIG } from '@/fsd_shared/configs';

export const getClientFCMToken = async (): Promise<string | null> => {
  try {
    const messaging = getMessaging();
    const currentToken = await getToken(messaging, {
      vapidKey: FIREBASE_CONFIG.vapidKey,
    });
    if (!currentToken) {
      return null;
    }
    return currentToken;
  } catch {
    return null;
  }
};