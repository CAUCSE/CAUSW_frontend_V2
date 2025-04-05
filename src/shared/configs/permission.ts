'use client';

import { getMessaging, getToken } from 'firebase/messaging';

async function getFirebaseToken() {
  try {
    const messaging = getMessaging();
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FB_VAPID_KEY,
    });

    if (!token) {
      return null;
    }

    return token;
  } catch (error) {
    return null;
  }
}

export async function onClickAlert() {
  if ('serviceWorker' in navigator && 'Notification' in window && 'PushManager' in window) {
    Notification.requestPermission().then(async result => {
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
