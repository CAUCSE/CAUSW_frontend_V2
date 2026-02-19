import { API } from '@/shared';

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
    await API.get<Api.V2Response<LockerV2.MeResponse>>('/api/v2/lockers/me');
  return data.data;
};

export const getLockerLocationV2 = async (locationId: string) => {
  const { data } = await API.get<Api.V2Response<LockerV2.LocationDetail>>(
    `/api/v2/lockers/locations/${locationId}`,
  );
  return data.data;
};

export const getLockerLocationsV2 = async () => {
  const { data } = await API.get<Api.V2Response<LockerV2.LocationsOverview>>(
    '/api/v2/lockers/locations',
  );
  return data.data;
};

export const getLockerPeriodStatusV2 = async () => {
  const { data } = await API.get<Api.V2Response<LockerV2.PeriodStatus>>(
    '/api/v2/lockers/period-status',
  );
  return data.data;
};
