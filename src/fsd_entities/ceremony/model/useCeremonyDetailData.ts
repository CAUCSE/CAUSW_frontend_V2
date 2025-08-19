'use client';

import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { ERROR_MESSAGES, MESSAGES } from '@/fsd_shared';

import { getAdminCeremonyDetail } from '../api';

export const useCeremonyData = ({ context, ceremonyId }: Ceremony.CeremonyDetailDataPros) => {
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
    isSetAll: false,
    targetAdmissionYears: [] as string[],
  });

  useEffect(() => {
    if (ceremonyId) {
      const fetchCeremonyDetail = async () => {
        try {
          const cermonyContent = await getAdminCeremonyDetail({ ceremonyId, context });

          setCeremonyDetails({
            title: cermonyContent.title,
            type: cermonyContent.category,
            register: cermonyContent.ceremonyState,
            content: cermonyContent.description,
            startDate: cermonyContent.startDate,
            endDate: cermonyContent.endDate,
            imageList: cermonyContent.attachedImageUrlList,
            applicantName: cermonyContent.applicantName,
            applicantStudentId: cermonyContent.applicantStudentId,
            isSetAll: cermonyContent.isSetAll,
            targetAdmissionYears: cermonyContent.targetAdmissionYears,
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
