'use client';

import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { ERROR_MESSAGES, MESSAGES } from '@/fsd_shared';

import { getAdminCeremonyAwaitList, getAdminCeremonyDetail } from '../api';

export const useAdminCeremonyData = () => {
  const [ceremonyList, setCeremonyList] = useState<Ceremony.CeremonyItem[]>([]);

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

  return ceremonyList;
};
