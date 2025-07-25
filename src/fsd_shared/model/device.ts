
export type DeviceType = 'android' | 'ios' | 'ipad' | 'desktop';

export const detectDeviceType = (): DeviceType => {
    const ua = navigator.userAgent.toLowerCase();
  
    if (/android/.test(ua)) return 'android';
    if (/iphone|ipod/.test(ua)) return 'ios';
    
    const isIpad = /ipad/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (isIpad) return 'ipad';
  
    return 'desktop';
  };