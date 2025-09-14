import { useQuery } from '@tanstack/react-query';

import { lockerQueryKey } from '@/shared';
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
export const useGetLockerList = (locationId: string) => {
  return useQuery({
    queryKey: lockerQueryKey.list(locationId),
    queryFn: async () => {
      const { data }: { data: Locker.LockersResponseDto } = await API.get(`/api/v1/lockers/locations/${locationId}`);
      return data;
    },
  });
};
