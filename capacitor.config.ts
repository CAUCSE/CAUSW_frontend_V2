import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'kr.co.causw',
  appName: '크자회(CCSSAA)',
  webDir: 'out',
  server: {
    url: 'https://www.causw.co.kr',
    cleartext: false, // localhost에서 개발할 때는 true로 설정 & firebase APN 값 Sandbox로 설정
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
