import { API } from '@/shared';

type ApiResponse<T> = {
  code: string;
  message: string;
  data: T;
};

export const getLockerLocations = async () => {
  const { data } = await API.get<Locker.LockerLocationsResponseDto>(
    '/api/v1/lockers/locations',
  );
  return data;
};

export const getLockerList = async (locationId: string) => {
  const { data } = await API.get<Locker.LockersResponseDto>(
    `/api/v1/lockers/locations/${locationId}`,
  );
  return data;
};

export const getMyLockerV2 = async () => {
  const { data } =
    await API.get<ApiResponse<LockerV2.MeResponse>>('/api/v2/lockers/me');
  return data.data;
};

export const getLockerLocationV2 = async (locationId: string) => {
  const { data } = await API.get<ApiResponse<LockerV2.LocationDetail>>(
    `/api/v2/lockers/locations/${locationId}`,
  );
  return data.data;
};
