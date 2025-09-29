import { API } from '@/shared';

export const getLockerLocations = async () => {
  const { data } = await API.get<Locker.LockerLocationsResponseDto>('/api/v1/lockers/locations');
  return data;
};

export const getLockerList = async (locationId: string) => {
  const { data } = await API.get<Locker.LockersResponseDto>(`/api/v1/lockers/locations/${locationId}`);
  return data;
};
