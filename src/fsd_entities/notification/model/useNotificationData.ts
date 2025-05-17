'use client';

import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { ERROR_MESSAGES, MESSAGES } from '@/fsd_shared';

import { getNotificationData } from '../api';

export const useNotificationData = () => {
  const [notificationData, setNotificationData] = useState<Notification.NotificationData[]>([]);
  //   useState<Occasion.Occasion[]>([]);
  const [occasionDetails, setOccasionDetails] = useState({
    title: '',
    type: '',
    register: '',
    content: '',
    startDate: '',
    endDate: '',
    imageList: [] as string[],
  });
  const fetchNotificationData = async () => {
    try {
      const data = await getNotificationData(0);
      console.log('Notification data:', data);
      setNotificationData(data.content);
    } catch (error) {
      toast.error(`${MESSAGES.OCCASION.REGISTRATION_LIST} - ${ERROR_MESSAGES.LIST_FETCH_FAIL}`);
    }
  };

  useEffect(() => {
    fetchNotificationData();
  }, []);

  //   useEffect(() => {
  //     if (occasionId) {
  //       const fetchCeremonyDetail = async () => {
  //         try {
  //           const OccasionContent = await getCeremonyDetail(occasionId);
  //           const matchedOccasion = ceremonyList.find(item => item.id === occasionId);

  //           setOccasionDetails({
  //             title: matchedOccasion ? matchedOccasion.title : OccasionContent.description,
  //             type: OccasionContent.category,
  //             register: OccasionContent.ceremonyState,
  //             content: OccasionContent.description,
  //             startDate: OccasionContent.startDate,
  //             endDate: OccasionContent.endDate,
  //             imageList: OccasionContent.attachedImageUrlList,
  //           });
  //         } catch (error) {
  //           toast.error(`${MESSAGES.OCCASION.DETAIL_CONTENT_TITLE} - ${ERROR_MESSAGES.DETAIL_CONTENT_FETCH_FAIL}`);
  //         }
  //       };

  //       fetchCeremonyDetail();
  //     }
  //   }, [occasionId, ceremonyList]);

  return { notificationData };
};
