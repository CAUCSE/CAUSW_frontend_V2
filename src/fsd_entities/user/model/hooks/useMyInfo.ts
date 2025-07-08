'use client';

import { getMyInfo } from '../../api';
import { useMyInfoStore } from '../stores';

export const useUserInfo = () => {
  const setUserStore = useMyInfoStore((state) => state.setUserStore);

  const updateMyInfoStore = async () => {
    const res = await getMyInfo();
    setUserStore(res.data);
  };

  return { updateMyInfoStore };
};
