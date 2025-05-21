'use client';

import { useEffect } from 'react';

import { usePushNotification } from '@/fsd_entities/notification/model/usePushNotification';

export const FCMTokenChecker = () => {
  const { compareFCMToken } = usePushNotification();

  useEffect(() => {
    compareFCMToken();
  }, []);

  return null;
};
