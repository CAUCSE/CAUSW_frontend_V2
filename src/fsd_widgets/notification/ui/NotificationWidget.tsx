'use client';

import { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useNotificationStore } from '@/fsd_entities/notification';
import { NotificationList } from '@/fsd_entities/notification';

import alarmIcon from '../../../../public/icons/ringing_bell.png';

export const NotificationWidget = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const ceremonyNotifications = useNotificationStore((state) => state.ceremonyNotifications);
  const loadNotifications = useNotificationStore((state) => state.loadNotifications);
  const loadCeremonyNotifications = useNotificationStore((state) => state.loadCeremonyNotifications);
  const markAsRead = useNotificationStore((state) => state.markAsRead);

  useEffect(() => {
    loadNotifications();
    loadCeremonyNotifications();
  }, []);

  return (
    <div className="mt-6 hidden w-full flex-col rounded-lg border border-yellow-500 bg-white px-3 py-3 shadow-md xl:block">
      {/* 일반 알림 */}
      <Link href="/setting/notification?tab=general">
        <div className="flex gap-2 pl-1 text-xl text-black">
          <Image src={alarmIcon} alt="알림 아이콘" className="h-7.5 w-6 pt-1" />
          <span>알림</span>
        </div>
      </Link>
      <NotificationList notifications={notifications} linkPrefix="/setting/notification" markAsRead={markAsRead} />

      {/* 경조사 알림 */}
      <Link href="/setting/notification?tab=ceremony">
        <div className="mt-4 flex gap-2 pl-1 text-xl text-black">
          <Image src={alarmIcon} alt="알림 아이콘" className="h-7.5 w-6 pt-1" />
          <span>최근 경조사 알림</span>
        </div>
      </Link>
      <NotificationList
        notifications={ceremonyNotifications}
        linkPrefix="/setting/notification"
        markAsRead={markAsRead}
      />
    </div>
  );
};
