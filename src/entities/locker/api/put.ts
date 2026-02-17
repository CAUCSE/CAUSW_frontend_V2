import { API } from '@/shared';

export const putLockerExtenstion = (lockerId: string) =>
  API.put(`/api/v1/lockers/${lockerId}`, {
    action: 'EXTEND',
    message: '사물함 연장',
  });

export const putLockerRegister = (lockerId: string) =>
  API.put(`/api/v1/lockers/${lockerId}`, {
    action: 'REGISTER',
    message: '사물함 등록',
  });

export const putLockerReturn = (lockerId: string) =>
  API.put(`/api/v1/lockers/${lockerId}`, {
    action: 'RETURN',
    message: '사물함 반납',
  });

export const postLockerReturnV2 = (id: string) =>
  API.post(`/api/v2/lockers/${id}/return`, {});

export const postLockerRegisterV2 = (id: string) =>
  API.post(`/api/v2/lockers/${id}/register`, {});

export const postLockerExtendV2 = (id: string) =>
  API.post(`/api/v2/lockers/${id}/extend`, {});
