import { AxiosResponse } from 'axios';

import { API, BASEURL, FORMAPI, setRscHeader } from '@/fsd_shared';
import { createFormData } from '@/utils';

import { USERS_ENDPOINT } from '../config';

const SSR_URL = BASEURL + USERS_ENDPOINT;

// csr api method.
////////////////////////////////////////////////////////////////

export const updateUserAcademicInfo = async (data: any) => {
  try {
    const response = (await API.put(`${USERS_ENDPOINT}/academic-record/application/update`, data)) as AxiosResponse;
    return response;
  } catch (error) {
    throw error;
  }
};

export const allowUser = async (param: string) => {
  try {
    const response = (await API.put(`${USERS_ENDPOINT}/admissions/${param}/accept`)) as AxiosResponse;
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateInfo = async (
  data: User.userUpdateDto, // FileList 타입 사용
): Promise<any> => {
  try {
    const payload = {
      ...data,
      images: undefined,
    };

    const formData = createFormData(
      payload,
      'userUpdateDto',
      data.profileImage ? [data.profileImage] : [],
      'profileImage',
    );

    const response = await FORMAPI.put('/api/v1/users', formData);

    return response.data; //
  } catch (error) {
    throw error;
  }
};

export const rejectApplyBoards = async (id: string) => {
  await API.put(`/api/v1/boards/apply/${id}/reject`);
};

export const acceptApplyBoards = async (id: string) => {
  await API.put(`/api/v1/boards/apply/${id}/accept`);
};

export const changeAttendanceUserState = async (
  targetUserId: string,
  applicationId: string,
  targetAcademicRecordRequestStatus: string,
  rejectMessage: string,
) => {
  await API.put(`/api/v1/users/academic-record/application/admin`, {
    targetUserId,
    applicationId,
    targetAcademicRecordRequestStatus,
    rejectMessage,
  });
};

export const updateAttendanceUserNote = async (id: string, note: string) => {
  await API.put(`/api/v1/users/academic-record/record/${id}`, note);
};

export const updateRole = async (id: string, role: User.Role, circleId: string | null) => {
  await API.put(`${USERS_ENDPOINT}/${id}/role`, {
    role: role,
    circleId: circleId,
  });
};

export const updateVTwo = async () => {
  await API.put(`${USERS_ENDPOINT}/update/isV2`);
};

// ssr api method.
////////////////////////////////////////////////////////////////

// 사용자 추방
export const expelUser = async (userId: string, expelReason: string) => {
  const headers = await setRscHeader();
  const response = await fetch(`${SSR_URL}/${userId}/drop`, {
    method: 'PUT',
    headers: headers,
    body: expelReason,
  });

  if (!response.ok) throw new Error(response.statusText);
  return true;
};

// 사용자 복구
export const restoreUser = async (userId: string) => {
  const headers = await setRscHeader();
  const response = await fetch(`${SSR_URL}/restore/${userId}`, {
    method: 'PUT',
    headers: headers,
  });

  if (!response.ok) throw new Error(response.statusText);
  return true;
};

//가입 승인
export const acceptAdmission = async (admissionId: string) => {
  const headers = await setRscHeader();
  const response = await fetch(`${SSR_URL}/admissions/${admissionId}/accept`, {
    method: 'PUT',
    headers: headers,
  });

  if (!response.ok) throw new Error(response.statusText);
  return true;
};

//가입 거부
export const rejectAdmission = async (userId: string, rejectReason: string) => {
  const headers = await setRscHeader();
  const response = await fetch(`${SSR_URL}/admissions/${userId}/reject`, {
    method: 'PUT',
    headers: headers,
    body: rejectReason,
  });

  if (!response.ok) throw new Error(response.statusText);
  return true;
};
