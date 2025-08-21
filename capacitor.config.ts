import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'kr.co.causw',
  appName: 'CAUSW',
  webDir: 'out',
  server: {
    url: 'https://www.causw.co.kr',
    cleartext: true,
  },
  ios: {
    contentInset: 'never',
    scrollEnabled: true,
    // 이 설정들이 중요!
    allowsLinkPreview: false,
    handleApplicationNotifications: false,
  },
  plugins: {
    StatusBar: {
      style: 'LIGHT_CONTENT',
      backgroundColor: '#ffffff',
      overlaysWebView: false, // 웹뷰 위에 덮어쓰지 않음
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;
