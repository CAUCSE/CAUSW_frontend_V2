'use client';

import { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useNotificationData, useNotificationStore } from '@/fsd_entities/notification';
import { NotificationList } from '@/fsd_entities/notification';

import { useGetBoardList } from '@/shared';

import alarmIcon from '../../../../public/icons/ringing_bell.png';

export const NotificationWidget = () => {
  const { notifications, ceremonyNotifications, loadNotifications, loadCeremonyNotifications, markAsRead } =
    useNotificationStore((state) => ({
      notifications: state.notifications,
      ceremonyNotifications: state.ceremonyNotifications,
      loadNotifications: state.loadNotifications,
      loadCeremonyNotifications: state.loadCeremonyNotifications,
      markAsRead: state.markAsRead,
    }));

  useEffect(() => {
    loadNotifications();
    loadCeremonyNotifications();
  }, []); // 주기적으로 새로고침을 해야 하는지 확인 필요

  const { notificationData } = useNotificationData();
  const { boards } = useGetBoardList();

  const matchedBoardPairs = notificationData.map((alarm) => {
    const matchedBoard = boards.find((board) => board.boardName === alarm.title);
    return {
      notificationLogId: alarm.notificationLogId,
      boardId: matchedBoard?.boardId ?? '',
      targetId: alarm.targetId,
    };
  });

  return (
    <div className="mt-6 hidden w-full flex-col rounded-lg border border-yellow-500 bg-white px-3 py-3 shadow-md xl:block">
      {/* 일반 알림 */}
      <Link href="/setting/notification?tab=general">
        <div className="flex gap-2 pl-1 text-xl text-black">
          <Image src={alarmIcon} alt="알림 아이콘" className="h-7.5 w-6 pt-1" />
          <span>알림</span>
        </div>
      </Link>
      <NotificationList notifications={notifications} markAsRead={markAsRead} matchedBoards={matchedBoardPairs} />

      {/* 경조사 알림 */}
      <Link href="/setting/notification?tab=ceremony">
        <div className="mt-4 flex gap-2 pl-1 text-xl text-black">
          <Image src={alarmIcon} alt="알림 아이콘" className="h-7.5 w-6 pt-1" />
          <span>최근 경조사 알림</span>
        </div>
      </Link>
      <NotificationList
        notifications={ceremonyNotifications}
        markAsRead={markAsRead}
        matchedBoards={matchedBoardPairs}
      />
    </div>
  );
};
