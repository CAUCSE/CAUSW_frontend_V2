'use client';

import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { ERROR_MESSAGES, MESSAGES } from '@/fsd_shared';

import { getAdminCeremonyDetail } from '../api';

export const useCeremonyData = (ceremonyId?: string) => {
  const [ceremonyDetails, setCeremonyDetails] = useState({
    title: '',
    type: '',
    register: '',
    content: '',
    startDate: '',
    endDate: '',
    imageList: [] as string[],
    applicantName: '',
    applicantStudentId: '',
  });

  useEffect(() => {
    if (ceremonyId) {
      const fetchCeremonyDetail = async () => {
        try {
          const cermonyContent = await getAdminCeremonyDetail(ceremonyId);
          // const matchedCeremony = ceremonyList.find((item) => item.id === ceremonyId);

          setCeremonyDetails({
            title: '결혼',
            type: cermonyContent.category,
            register: cermonyContent.ceremonyState,
            content: cermonyContent.description,
            startDate: cermonyContent.startDate,
            endDate: cermonyContent.endDate,
            imageList: cermonyContent.attachedImageUrlList,
            applicantName: cermonyContent.applicantName,
            applicantStudentId: cermonyContent.applicantStudentId,
          });
        } catch (error) {
          toast.error(`${MESSAGES.CEREMONY.DETAIL_CONTENT_TITLE} - ${ERROR_MESSAGES.DETAIL_CONTENT_FETCH_FAIL}`);
        }
      };

      fetchCeremonyDetail();
    }
  }, [ceremonyId]);

  return ceremonyDetails;
};
