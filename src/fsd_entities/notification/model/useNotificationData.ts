'use client';

import { useQuery } from '@tanstack/react-query';

import { getCeremonyNotificationData, getNotificationData } from '../api';
import { notificationQueryKey } from '../hooks/queries/notificationQueryKey';

type NotificationResponse = {
  content: Notification.NotificationData[];
};

export const useNotificationData = () =>
  useQuery<NotificationResponse, Error, Notification.NotificationData[]>({
    queryKey: notificationQueryKey.general(),
    queryFn: () => getNotificationData(0),
    select: (data) => data.content,
  });

export const useCeremonyNotificationData = () =>
  useQuery<NotificationResponse, Error, Notification.NotificationData[]>({
    queryKey: notificationQueryKey.ceremony(),
    queryFn: () => getCeremonyNotificationData(0),
    select: (data) => data.content,
  });