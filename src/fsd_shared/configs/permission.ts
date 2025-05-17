'use client';

import { getMessaging, getToken } from 'firebase/messaging';

async function getFirebaseToken() {
  try {
    const messaging = getMessaging();
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FB_VAPID_KEY,
    });

    console.log(token);

    if (!token) {
      console.error('FCM 등록 토큰을 가져올 수 없습니다.');
      return null;
    }

    console.log('FCM Token:', token);
    return token;
  } catch (error) {
    console.error('FCM 토큰을 가져오는 중 오류 발생:', error);
    return null;
  }
}

export async function onClickAlert() {
  if ('serviceWorker' in navigator && 'Notification' in window && 'PushManager' in window) {
    Notification.requestPermission().then(async (result) => {
      console.log(result);
      if (result === 'granted') {
        const token = await getFirebaseToken();
        // await savePushToken(token);
        // setAlertGranted(true);
      } else if (result === 'denied') {
        // setAlertGranted(false);
      }
    });
  }
}
