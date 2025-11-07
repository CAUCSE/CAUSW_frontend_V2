'use client';

import { useQuery } from '@tanstack/react-query';

import { API } from '@/shared';

import { bannerQueryKey } from '../config';

export const useGetBannerList = () => {
  return useQuery({
    queryKey: bannerQueryKey.list(),
    queryFn: async () => {
      const { data }: { data: Banner.BannerListResponseDto } =
        await API.get('/api/v1/events');
      return data;
    },
  });
};
