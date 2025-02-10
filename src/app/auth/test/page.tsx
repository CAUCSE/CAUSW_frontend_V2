"use client";

import { getMessaging, getToken } from "firebase/messaging";
import { useEffect, useState } from "react";

import "@/firebase-messaging-sw";

const Page = () => {
  const [token, setToken] = useState("NaN");
  useEffect(() => {
    const messaging = getMessaging();
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
  return <>{token}</>;
};

export default Page;
