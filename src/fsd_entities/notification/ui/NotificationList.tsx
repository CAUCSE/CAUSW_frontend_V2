import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import unReadMessage from '../../../../public/icons/unread_message.png';

interface NotificationListProps {
  notifications: Notification.Notification[];
  notificationType: 'general' | 'ceremony';
  markAsRead: (id: string) => void;
}

export const NotificationList = ({ notifications, notificationType, markAsRead }: NotificationListProps) => {
  const router = useRouter();

  return (
    <ul className="mt-3 space-y-2 rounded-lg bg-gray-200 p-1">
      {notifications.map((notification) => {
        const targetLink =
          notificationType === 'general'
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
              <div className="flex flex-col text-sm text-gray-600">
                <p className="text-l text-black">{notification.title}</p>
                <p>{notification.body}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
