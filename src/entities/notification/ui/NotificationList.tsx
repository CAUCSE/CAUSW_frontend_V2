'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import unReadMessage from '../../../../public/icons/unread_message.png';
import { NotificationType } from '../model';
import { NotificationListSkeleton } from './NotificationListSkeleton';

interface NotificationListProps {
  notifications: Notification.Notification[];
  notificationType: NotificationType;
  markAsRead: (id: string) => void;
  isLoading: boolean;
}

export const NotificationList = ({ notifications, notificationType, markAsRead, isLoading }: NotificationListProps) => {
  const router = useRouter();
  if (isLoading) {
    return <NotificationListSkeleton />;
  }
  if (notifications.length === 0) {
    return (
      <div className="mt-3 flex h-48 items-center justify-center rounded-lg bg-gray-200 p-1 text-sm text-gray-500">
        <p>표시할 알림이 없습니다.</p>
      </div>
    );
  }

  return (
    <ul className="mt-3 space-y-2 rounded-lg bg-gray-200 p-1">
      {notifications.map((notification) => {
        const targetLink =
          notificationType === NotificationType.GENERAL
            ? `/board/${notification.targetParentId}/${notification.targetId}`
            : notification.targetId
              ? `/ceremony/${notification.targetId}`
              : `/ceremony/${notification.notificationLogId}`;

        return (
          <li
            key={notification.notificationLogId}
            className="cursor-pointer rounded-lg bg-white p-1"
            onClick={() => {
              if (!notification.isRead) {
                markAsRead(notification.notificationLogId);
              }
              router.push(targetLink);
            }}
          >
            <div className="flex items-center gap-3">
              <Image src={unReadMessage} alt="읽지 않은 알림 아이콘" className="h-5 w-6 pt-1 pl-1" />
              <div className="flex min-w-0 flex-col text-sm text-gray-600">
                <p className="truncate text-base font-medium text-black">{notification.title}</p>
                <p className="line-clamp-1 text-sm text-gray-600">{notification.body}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
