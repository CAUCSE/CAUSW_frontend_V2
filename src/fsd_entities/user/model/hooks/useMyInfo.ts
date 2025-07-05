'use client';

// 유저 리펙 TODO: useMyInfoStore로 변경.
import { useUserStore } from '@/shared';

import { getMyInfo } from '../../api';

export const useUserInfo = () => {
  const setUserStore = useUserStore((state) => state.setUserStore);

  const updateMyInfoStore = async () => {
    const res = await getMyInfo();
    setUserStore(res.data);
  };

  return { updateMyInfoStore };
};
