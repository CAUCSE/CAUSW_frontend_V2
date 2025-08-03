export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (Notification.permission === 'granted') {
    return 'granted';
  } else if (Notification.permission === 'denied') {
    return 'denied';
  } else {
    return await Notification.requestPermission();
  }
};

export const checkNotificationPermission = (): NotificationPermission => {
  return Notification.permission;
};