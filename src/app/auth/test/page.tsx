"use client";

import { getMessaging, getToken } from "firebase/messaging";
import { useEffect, useState } from "react";

import "@/firebase-messaging-sw";

const getDeviceType = () => {
  const userAgent = navigator.userAgent || navigator.vendor;

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  if (/iPad/i.test(userAgent)) {
    return "iPadOS";
  }

  if (/iPhone|iPod/i.test(userAgent) && !(window as any).MSStream) {
    return "iOS";
  }

  if (/Win/i.test(userAgent)) {
    return "Windows";
  }

  if (/Macintosh/i.test(userAgent)) {
    return "Mac";
  }

  return "Web";
};


const Page = () => {
  const [token, setToken] = useState("NaN");
  const [deviceType, setDeviceType] = useState("Unknown");

  const requestPushPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      alert("알림 권한이 허용되지 않았습니다. 😢");
      return;
  }}

  useEffect(() => {
    const messaging = getMessaging();
    setDeviceType(getDeviceType());
    getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FB_VAPID_KEY })
      .then((currentToken) => {
        if (currentToken) {
          setToken(currentToken);
        } else {
          // Show permission request UI
          setToken(
            "No registration token available. Request permission to generate one.",
          );
          console.log(
            "No registration token available. Request permission to generate one.",
          );
          // ...
        }
      })
      .catch((err) => {
        setToken("An error occurred while retrieving token.");
        console.log("An error occurred while retrieving token. ", err);
        // ...
      });
  }, []);
  return (
    <>
      <div className="w-full select-text">
      <div onClick={requestPushPermission}>푸시 권한 요청하기 (iOS 대응)</div>
      <div onClick = {() => {}}> 내 토큰 서버에 저장 </div>
      <div onClick = {() => {}}> 서버에 저장된 내 토큰 조회 </div>
      <span className="block w-full break-all">현재 접속한 기기 : {deviceType}</span>
      <span className="block w-full break-all">{token}</span>
      </div>
    </>
  );
};

export default Page;
