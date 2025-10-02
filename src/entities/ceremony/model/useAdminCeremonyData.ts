'use client';

import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { ERROR_MESSAGES, MESSAGES } from '@/shared';

import { getAdminCeremonyAwaitList } from '../api';

interface useAdminCeremonyDataProps {
  pageNum: number;
}
export const useAdminCeremonyData = ({
  pageNum = 0,
}: useAdminCeremonyDataProps) => {
  const [ceremonyList, setCeremonyList] = useState<Ceremony.CeremonyItem[]>([]);

  const fetchCeremonyList = async () => {
    try {
      const data = await getAdminCeremonyAwaitList(pageNum);
      setCeremonyList(data);
    } catch (error) {
      toast.error(
        `${MESSAGES.CEREMONY.REGISTRATION_LIST} - ${ERROR_MESSAGES.LIST_FETCH_FAIL}`,
      );
    }
  };

  useEffect(() => {
    fetchCeremonyList();
  }, []);

  return ceremonyList;
};
