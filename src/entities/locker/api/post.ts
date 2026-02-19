import { API } from '@/shared';

export const postLockerReturnV2 = (id: string) =>
  API.post(`/api/v2/lockers/${id}/return`, {});

export const postLockerRegisterV2 = (id: string) =>
  API.post(`/api/v2/lockers/${id}/register`, {});

export const postLockerExtendV2 = (id: string) =>
  API.post(`/api/v2/lockers/${id}/extend`, {});
