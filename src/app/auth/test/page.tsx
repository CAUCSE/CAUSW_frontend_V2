'use client';

import { useEffect, useState } from 'react';

import { getMessaging, getToken } from 'firebase/messaging';

import '@/firebase-messaging-sw';

const getDeviceType = (): 'android' | 'ios' | 'ipad' | 'desktop' => {
  const ua = navigator.userAgent.toLowerCase();

  const forced = process.env.NEXT_PUBLIC_FORCE_DEVICE_TYPE;
  // Android
  if (/android/.test(ua)) return 'android';

  // iPhone, iPod
  if (/iphone|ipod/.test(ua)) return 'ios';

  // iPad (modern iPadOS가 userAgent에 Mac처럼 보이는 경우도 커버)
  const isIpad = /ipad/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (isIpad) return 'ipad';

  return 'desktop';
};

const requestPushPermission = async () => {
  if (Notification.permission === 'granted') {
    alert('알림 이미 허용됨 ✅');
  } else if (Notification.permission === 'denied') {
    alert('알림이 차단되어 있습니다. 설정 페이지에서 알림 권한을 변경해주세요.');
  } else {
    alert('알림 권한 요청 필요 🔔');
    Notification.requestPermission().then((permission) => {
      alert(`새 권한 상태:, ${permission}`);
    });
  }
};

const Page = () => {
  const [token, setToken] = useState('NaN');
  const [deviceType, setDeviceType] = useState('Unknown');

  useEffect(() => {
    const messaging = getMessaging();
    setDeviceType(getDeviceType());
    getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FB_VAPID_KEY })
      .then((currentToken) => {
        if (currentToken) {
          setToken(currentToken);
        } else {
          // Show permission request UI
          setToken('No registration token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        setToken('An error occurred while retrieving token.');
      });
  }, []);
  return (
    <>
      <div className="w-full select-text">
        <div onClick={requestPushPermission}>푸시 권한 요청하기 (iOS 대응)</div>
        <div onClick={() => {}}> 내 토큰 서버에 저장 </div>
        <div onClick={() => {}}> 서버에 저장된 내 토큰 조회 </div>
        <span className="block w-full break-all">현재 접속한 기기 : {deviceType}</span>
        <span className="block w-full break-all">{token}</span>
      </div>
    </>
  );
};

export default Page;
