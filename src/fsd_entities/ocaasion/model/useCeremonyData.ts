'use client';

import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { ERROR_MESSAGES, MESSAGES } from '@/fsd_shared';

import { getCeremonyAwaitList, getCeremonyDetail } from '../api/get';

export const useCeremonyData = (occasionId?: string) => {
  const [ceremonyList, setCeremonyList] = useState<Occasion.Occasion[]>([]);
  const [occasionDetails, setOccasionDetails] = useState({
    title: '',
    type: '',
    register: '',
    content: '',
    startDate: '',
    endDate: '',
    imageList: [] as string[],
  });
  const fetchCeremonyList = async () => {
    try {
      const data = await getCeremonyAwaitList(0, 10);
      setCeremonyList(data);
    } catch (error) {
      toast.error(`${MESSAGES.OCCASION.REGISTRATION_LIST} - ${ERROR_MESSAGES.LIST_FETCH_FAIL}`);
    }
  };

  useEffect(() => {
    fetchCeremonyList();
  }, []);

  useEffect(() => {
    if (occasionId) {
      const fetchCeremonyDetail = async () => {
        try {
          const OccasionContent = await getCeremonyDetail(occasionId);
          const matchedOccasion = ceremonyList.find((item) => item.id === occasionId);

          setOccasionDetails({
            title: matchedOccasion ? matchedOccasion.title : OccasionContent.description,
            type: OccasionContent.category,
            register: OccasionContent.ceremonyState,
            content: OccasionContent.description,
            startDate: OccasionContent.startDate,
            endDate: OccasionContent.endDate,
            imageList: OccasionContent.attachedImageUrlList,
          });
        } catch (error) {
          toast.error(`${MESSAGES.OCCASION.DETAIL_CONTENT_TITLE} - ${ERROR_MESSAGES.DETAIL_CONTENT_FETCH_FAIL}`);
        }
      };

      fetchCeremonyDetail();
    }
  }, [occasionId, ceremonyList]);

  return { ceremonyList, occasionDetails };
};
