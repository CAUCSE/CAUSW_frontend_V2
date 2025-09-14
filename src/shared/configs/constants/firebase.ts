export const FIREBASE_CONFIG = {
    apiKey: process.env.NEXT_PUBLIC_FB_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FB_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_FB_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_FB_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_FB_APPID,
    vapidKey: process.env.NEXT_PUBLIC_FB_VAPID_KEY,
  } as const;
  