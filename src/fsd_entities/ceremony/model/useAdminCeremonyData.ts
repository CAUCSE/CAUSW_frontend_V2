'use client';

import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { ERROR_MESSAGES, MESSAGES } from '@/fsd_shared';

import { getAdminCeremonyAwaitList, getAdminCeremonyDetail } from '../api';

export const useCeremonyData = (ceremonyId?: string) => {
  const [ceremonyList, setCeremonyList] = useState<Ceremony.Ceremony[]>([]);
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
  const fetchCeremonyList = async () => {
    try {
      const data = await getAdminCeremonyAwaitList(0, 10);
      setCeremonyList(data);
    } catch (error) {
      toast.error(`${MESSAGES.CEREMONY.REGISTRATION_LIST} - ${ERROR_MESSAGES.LIST_FETCH_FAIL}`);
    }
  };

  useEffect(() => {
    fetchCeremonyList();
  }, []);

  useEffect(() => {
    if (ceremonyId) {
      const fetchCeremonyDetail = async () => {
        try {
          const cermonyContent = await getAdminCeremonyDetail(ceremonyId);
          const matchedCeremony = ceremonyList.find((item) => item.id === ceremonyId);

          setCeremonyDetails({
            title: matchedCeremony ? matchedCeremony.title : cermonyContent.description,
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
  }, [ceremonyId, ceremonyList]);

  return { ceremonyList, ceremonyDetails };
};
