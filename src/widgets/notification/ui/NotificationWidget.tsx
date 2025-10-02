'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
  NotificationType,
  useCeremonyNotifications,
  useMarkAsRead,
  useNotifications,
} from '@/entities/notification';
import { NotificationList } from '@/entities/notification';

import alarmIcon from '../../../../public/icons/ringing_bell.png';

export const NotificationWidget = () => {
  const { data: notifications = [], isLoading: isGeneralLoading } =
    useNotifications();
  const { data: ceremonyNotifications = [], isLoading: isCeremonyLoading } =
    useCeremonyNotifications();
  const markAsRead = useMarkAsRead();

  return (
    <div className="mt-6 hidden w-full flex-col rounded-lg border border-yellow-500 bg-white px-3 py-3 shadow-md xl:block">
      {/* 일반 알림 */}
      <Link href="/setting/notification?tab=general">
        <div className="flex gap-2 pl-1 text-xl text-black">
          <Image src={alarmIcon} alt="알림 아이콘" className="h-7.5 w-6 pt-1" />
          <span>알림</span>
        </div>
      </Link>
      <NotificationList
        notifications={notifications}
        notificationType={NotificationType.GENERAL}
        markAsRead={markAsRead.mutate}
        isLoading={isGeneralLoading}
      />

      {/* 경조사 알림 */}
      <Link href="/setting/notification?tab=ceremony">
        <div className="mt-4 flex gap-2 pl-1 text-xl text-black">
          <Image src={alarmIcon} alt="알림 아이콘" className="h-7.5 w-6 pt-1" />
          <span>최근 경조사 알림</span>
        </div>
      </Link>
      <NotificationList
        notifications={ceremonyNotifications}
        notificationType={NotificationType.CEREMONY}
        markAsRead={markAsRead.mutate}
        isLoading={isCeremonyLoading}
      />
    </div>
  );
};
