import { useQuery } from '@tanstack/react-query';

import { lockerQueryKey } from '@/fsd_shared';
import { API } from '@/shared';

export const useGetLockerLocations = () => {
  return useQuery({
    queryKey: lockerQueryKey.locations(),
    queryFn: async () => {
      const { data }: { data: Locker.LockerLocationsResponseDto } = await API.get('/api/v1/lockers/locations');
      return data;
    },
  });
};
