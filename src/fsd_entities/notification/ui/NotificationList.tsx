'use client';

import Image from 'next/image';
import Link from 'next/link';

import unReadMessage from '../../../../public/icons/unread_message.png';

interface NotificationListProps {
  notifications: Notification[];
  markAsRead: (id: string) => void;
  matchedBoards: {
    notificationLogId: string;
    boardId: string;
    targetId: string;
  }[];
}

const getNotificationRoute = (
  notification: Notification,
  matchedBoards: { notificationLogId: string; boardId: string; targetId: string }[],
) => {
  const match = matchedBoards.find((m) => m.notificationLogId === notification.notificationLogId);

  if (notification.noticeType === 'BOARD' && match?.boardId) {
    return `/board/${match.boardId}/${notification.targetId}`;
  }
  if (notification.noticeType === 'CEREMONY') {
    return `/ceremony/${notification.targetId}`;
  }

  return '/';
};

export const NotificationList = ({ notifications, markAsRead, matchedBoards }: NotificationListProps) => {
  return (
    <ul className="mt-3 space-y-2 rounded-lg bg-gray-200 p-1">
      {notifications.map((notification) => {
        const matchedBoard = getNotificationRoute(notification, matchedBoards);

        return (
          <li key={notification.notificationLogId} className="rounded-lg bg-white p-1">
            <Link
              href={matchedBoard}
              className="flex items-center gap-3"
              onClick={() => markAsRead(notification.notificationLogId)}
            >
              <Image src={unReadMessage} alt="읽지 않은 알림 아이콘" className="h-5 w-6 pl-1 pt-1" />
              <div className="flex flex-col text-sm text-gray-600">
                <p className="text-l text-black">{notification.title}</p>
                <p>{notification.body}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
