'use client';

import { useQuery } from '@tanstack/react-query';

import { getCeremonyNotificationSetting } from '@/fsd_entities/ceremony';
import { ceremonyQueryKey } from './ceremonyQueryKey';

export const useCeremonySettingQuery = () => {
  return useQuery({
    queryKey: ceremonyQueryKey.setting(),
    queryFn: getCeremonyNotificationSetting,
  });
};