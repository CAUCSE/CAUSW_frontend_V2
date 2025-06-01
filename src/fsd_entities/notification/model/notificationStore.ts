import { toast } from 'react-hot-toast';
import { create } from 'zustand';

import { getCeremonyNotifications, getNotifications } from '../api/get';
import { markAsRead } from '../api/post';
import { Notification } from '../config/types';

interface NotificationState {
  notifications: Notification[];
  ceremonyNotifications: Notification[];
  loadNotifications: () => Promise<void>;
  loadCeremonyNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  ceremonyNotifications: [],

  loadNotifications: async () => {
    try {
      const notifications = await getNotifications();
      set({ notifications });
    } catch (error) {
      toast.error('일반 알림 불러오기 실패: 서버 응답 오류');
    }
  },

  loadCeremonyNotifications: async () => {
    try {
      const ceremonyNotifications = await getCeremonyNotifications();
      set({ ceremonyNotifications });
    } catch (error) {
      toast.error('경조사 알림 불러오기 실패: 서버 응답 오류');
    }
  },

  markAsRead: async (id: string) => {
    try {
      await markAsRead(id);
      set((state) => ({
        notifications: state.notifications.map((n) => (n.notificationLogId === id ? { ...n, isRead: true } : n)),
        ceremonyNotifications: state.ceremonyNotifications.map((n) =>
          n.notificationLogId === id ? { ...n, isRead: true } : n,
        ),
      }));
      toast.success(`알림 ${id} 읽음 처리 성공`);
    } catch (error) {
      toast.error('알림 읽음 처리 실패: 서버 응답 오류');
    }
  },
}));
