'use client';

import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { ERROR_MESSAGES, MESSAGES } from '@/fsd_shared';

import { getCeremonyNotificationData, getNotificationData } from '../api';

export const useNotificationData = () => {
  const [notificationData, setNotificationData] = useState<Notification.NotificationData[]>([]);

  const fetchNotificationData = async () => {
    try {
      const data = await getNotificationData(0);
      setNotificationData(data.content);
    } catch (error) {
      toast.error(`${MESSAGES.OCCASION.REGISTRATION_LIST} - ${ERROR_MESSAGES.LIST_FETCH_FAIL}`);
    }
  };

  useEffect(() => {
    fetchNotificationData();
  }, []);
  return { notificationData };
};
export const useCeremonyNotificationData = () => {
  const [ceremonyNotificationData, setCeremonyNotificationData] = useState<Notification.NotificationData[]>([]);

  const fetchCeremonyNotificationData = async () => {
    try {
      const data = await getCeremonyNotificationData(0);
      setCeremonyNotificationData(data.content);
    } catch (error) {
      toast.error(`${MESSAGES.OCCASION.REGISTRATION_LIST} - ${ERROR_MESSAGES.LIST_FETCH_FAIL}`);
    }
  };

  useEffect(() => {
    fetchCeremonyNotificationData();
  }, []);
  return { ceremonyNotificationData };
};
