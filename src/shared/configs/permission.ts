"use client";
import axios from "axios";

// PushSubscription을 가져오는 함수
async function getPushSubscription(): Promise<PushSubscription | null> {
  try {
    const registration = await navigator.serviceWorker.getRegistration();

    if (!registration) {
      console.error("ServiceWorkerRegistration을 찾을 수 없습니다.");
      return null;
    }

    if (!process.env.NEXT_PUBLIC_FB_VAPID_KEY) {
      console.error("VAPID Puplic key가 존재하지 않습니다.");
      return null;
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_FB_VAPID_KEY,
    });

    return subscription;
  } catch (e) {
    console.error("PushSubscription을 가져오는 동안 오류가 발생했습니다: ", e);
    return null;
  }
}

// 서버에 PushSubscription을 저장하는 함수
async function savePushSubscription(subscription: PushSubscription | null) {
  if (!subscription) {
    console.error("PushSubscription이 존재하지 않습니다.");
    return;
  }

  axios
    .post("/api/subscribe", {
      subscription,
    })
    .catch((e) => console.error(e));
}

export async function onClickAlert() {
  if (
    "serviceWorker" in navigator &&
    "Notification" in window &&
    "PushManager" in window
  ) {
    Notification.requestPermission().then(async (result) => {
      if (result === "granted") {
        const subscription = await getPushSubscription();
        // await savePushSubscription(subscription);
        // setAlertGranted(true);
      } else if (result === "denied") {
        // setAlertGranted(false);
      }
    });
  }
}
