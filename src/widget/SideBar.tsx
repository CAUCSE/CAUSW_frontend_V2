'use client';

import { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';
import { create } from 'zustand';

import { API, getRccAccess } from '@/fsd_shared/configs/api/csrConfig';

import { ProfileImage, SubHeader } from '@/entities';
import { AuthRscService, BASEURL, UserService, useUserStore } from '@/shared';

import alarmIcon from '../../public/icons/ringing_bell.png';
import unReadMessage from '../../public/icons/unread_message.png';

interface Notification {
  targetId: string;
  title: string;
  noticeType: string;
  body: string;
  isRead: boolean;
  notificationLogId: string;
}

interface NotificationState {
  notifications: Notification[];
  ceremonyNotifications: Notification[];
  loadNotifications: () => Promise<void>;
  loadCeremonyNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
}

const NotificationService = {
  getNotifications: async (): Promise<Notification[]> => {
    const URI = `${BASEURL}/api/v1/notifications/log/general/top4`;

    try {
      const response: AxiosResponse<Notification[]> = await API.get(URI, {
        headers: {
          Authorization: getRccAccess(),
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch notifications');
      }

      return response.data;
    } catch (error) {
      toast.error('알림 가져오기 실패: 서버 응답 오류');
      throw error;
    }
  },

  getCeremonyNotifications: async (): Promise<Notification[]> => {
    const URI = `${BASEURL}/api/v1/notifications/log/ceremony/top4`;

    try {
      const response: AxiosResponse<Notification[]> = await API.get(URI, {
        headers: {
          Authorization: getRccAccess(),
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch ceremony notifications');
      }

      return response.data;
    } catch (error) {
      toast.error('경조사 알림 가져오기 실패: 서버 응답 오류');
      throw error;
    }
  },

  markAsRead: async (id: string): Promise<void> => {
    const URI = `${BASEURL}/api/v1/notifications/log/isRead/${id}`;

    try {
      await API.post(
        URI,
        {},
        {
          headers: {
            Authorization: getRccAccess(),
          },
        },
      );
      toast.error(`알림 ${id} 읽음 처리 완료`);
    } catch (error) {
      toast.error(`알림 ${id} 읽음 처리 실패: 서버 응답 오류`);
      throw error;
    }
  },
};

const useNotificationStore = create<NotificationState>(set => ({
  notifications: [],
  ceremonyNotifications: [],

  loadNotifications: async () => {
    try {
      const notifications = await NotificationService.getNotifications();
      set({ notifications });
    } catch (error) {
      toast.error('일반 알림 불러오기 실패: 서버 응답 오류');
    }
  },

  loadCeremonyNotifications: async () => {
    try {
      const ceremonyNotifications = await NotificationService.getCeremonyNotifications();
      set({ ceremonyNotifications });
    } catch (error) {
      toast.error('경조사 알림 불러오기 실패: 서버 응답 오류');
    }
  },

  markAsRead: async (id: string) => {
    try {
      await NotificationService.markAsRead(id);
      set(state => ({
        notifications: state.notifications.map(n => (n.targetId === id ? { ...n, isRead: true } : n)),
        ceremonyNotifications: state.ceremonyNotifications.map(n => (n.targetId === id ? { ...n, isRead: true } : n)),
      }));
      toast.error(`알림 ${id} 읽음 처리 성공`);
    } catch (error) {
      toast.error('알림 읽음 처리 실패: 서버 응답 오류');
    }
  },
}));

export const SideBar = () => {
  const { getMe } = UserService();
  const { signout } = AuthRscService();

  const notifications = useNotificationStore(state => state.notifications);
  const ceremonyNotifications = useNotificationStore(state => state.ceremonyNotifications);
  const loadNotifications = useNotificationStore(state => state.loadNotifications);
  const loadCeremonyNotifications = useNotificationStore(state => state.loadCeremonyNotifications);
  const markAsRead = useNotificationStore(state => state.markAsRead);

  const name = useUserStore(state => state.name);
  const email = useUserStore(state => state.email);
  const profileImage = useUserStore(state => state.profileImageUrl);

  const handleNoRefresh = async () => {
    await signout();
    location.href = '/auth/signin';
  };

  useEffect(() => {
    getMe();
    loadNotifications();
    loadCeremonyNotifications();
  }, []);

  return (
    <div className="fixed -top-1 right-0 flex h-[55px] w-full items-center justify-end space-y-4 pr-4 xl:h-screen xl:w-72 xl:flex-col xl:justify-center">
      <div className="absolute left-3 top-4 flex flex-col items-center text-black xl:left-52 xl:top-11">
        <span
          className="icon-[codicon--sign-out] text-2xl xl:text-4xl"
          onClick={() => {
            handleNoRefresh();
          }}
        ></span>
        <span className="hidden text-xs text-black underline xl:block xl:text-sm">로그아웃</span>
      </div>

      <div className="absolute left-12 top-0 flex flex-col items-center text-black xl:hidden">
        <Link href="/occasion">
          <span className="text-black-400 icon-[codicon--bell] text-2xl"></span>
        </Link>
      </div>

      <div className="max-xl:hidden">
        <ProfileImage src={profileImage} />
      </div>
      <div className="mr-2 flex flex-col items-end xl:mr-0 xl:items-center">
        <SubHeader big>{name}</SubHeader>
        <SubHeader gray>{email}</SubHeader>
      </div>

      <div className="xl:hidden">
        <ProfileImage src={profileImage} />
      </div>

      <div className="mt-6 w-full flex-col rounded-lg border border-yellow-500 bg-white px-3 py-3 shadow-md max-xl:hidden">
        <Link href="/occasion">
          <div className="flex gap-2 pl-1 text-xl text-black">
            <Image src={alarmIcon} alt="알림 아이콘" className="h-7.5 w-6 pt-1" />
            <span>알림</span>
          </div>
        </Link>
        <ul className="mt-3 space-y-2 rounded-lg bg-gray-200 p-1">
          {notifications.map(notification => (
            <li key={notification.notificationLogId} className="rounded-lg bg-white p-1">
              <Link
                href={`/setting/notification/alarm/${notification.notificationLogId}`}
                className="flex items-center gap-3"
                onClick={() => markAsRead(notification.notificationLogId)}
              >
                <Image src={unReadMessage} alt="읽지 않은 알림 아이콘" className="h-5 w-6 pl-1 pt-1" />{' '}
                <div className="flex flex-col text-sm text-gray-600">
                  <p className="text-l text-black">{notification.title}</p>
                  <p>{notification.body}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 w-full rounded-lg border border-yellow-500 bg-white px-3 py-3 shadow-md max-xl:hidden">
        <Link href="/occasion">
          <div className="flex gap-2 pl-1 text-xl text-black">
            <Image src={alarmIcon} alt="알림 아이콘" className="h-7.5 w-6 pt-1" />
            <span>최근 경조사 알림</span>
          </div>
        </Link>
        <ul className="mt-3 space-y-2 rounded-lg bg-gray-200 p-1">
          {ceremonyNotifications.map(ceremony => (
            <li key={ceremony.notificationLogId} className="rounded-lg bg-white p-1">
              <Link
                href={`/setting/notification/occasion/${ceremony.notificationLogId}`}
                className="flex items-center gap-3"
                onClick={() => markAsRead(ceremony.notificationLogId)}
              >
                <Image src={unReadMessage} alt="읽지 않은 알림 아이콘" className="h-5 w-6 pl-1 pt-1" />{' '}
                <div className="flex flex-col text-sm text-gray-600">
                  <p className="text-l text-black">{ceremony.title}</p>
                  <p>{ceremony.body}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
