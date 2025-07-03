import Image from 'next/image';
import Link from 'next/link';

import unReadMessage from '../../../../public/icons/unread_message.png';

interface NotificationListProps {
  notifications: Notification.Notification[];
  linkPrefix: string;
  markAsRead: (id: string) => void;
}

export const NotificationList = ({ notifications, linkPrefix, markAsRead }: NotificationListProps) => {
  return (
    <ul className="mt-3 space-y-2 rounded-lg bg-gray-200 p-1">
      {notifications.map((notification) => (
        <li key={notification.notificationLogId} className="rounded-lg bg-white p-1">
          <Link
            href={`${linkPrefix}/${notification.notificationLogId}`}
            className="flex items-center gap-3"
            onClick={() => markAsRead(notification.notificationLogId)}
          >
            <Image src={unReadMessage} alt="읽지 않은 알림 아이콘" className="h-5 w-6 pt-1 pl-1" />
            <div className="flex flex-col text-sm text-gray-600">
              <p className="text-l text-black">{notification.title}</p>
              <p>{notification.body}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
