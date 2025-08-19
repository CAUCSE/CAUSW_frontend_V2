'use client';

import axios, { AxiosResponse } from 'axios';

import { BASEURL, FORMAPI, getRccAccess } from '@/fsd_shared';
import { API } from '@/fsd_shared';
import { createFormData } from '@/utils';

const URI = '/api/v1/users';

export const signin = async (body: User.SignInRequestDto): Promise<{ accessToken: string; refreshToken: string }> => {
  const response = await API.post(`${URI}/sign-in`, body);
  return response.data;
};

export const signup = async (body: User.SignUpFormPost): Promise<{ accessToken: string; refreshToken: string }> => {
  const response = await API.post(`${URI}/sign-up`, body);
  return response.data;
};

export const submitAdmissionsApplication = async (
  data: User.AdmissionCreateRequestDto, // FileList 타입 사용
): Promise<any> => {
  const payload = {
    ...data,
    images: undefined,
  };

  const formData = createFormData(
    payload,
    'userAdmissionCreateRequestDto',
    data.attachImage ? Array.from(data.attachImage) : [],
    'userAdmissionAttachImageList',
  );

  const response = await FORMAPI.post('/api/v1/users/admissions/apply', formData);

  return response.data;
};

export const signout = async (payload: User.SignOutRequestDto): Promise<void> => {
  await API.post(`${URI}/sign-out`, payload);
};

export const postAcademicRecord = async (data: User.CreateUserAcademicRecordApplicationRequestDto): Promise<any> => {
  const payload = {
    ...data, // 기존 데이터 복사
    images: undefined, // images는 따로 처리하므로 제거
  };

  const formData = createFormData(
    payload,
    'createUserAcademicRecordApplicationRequestDto',
    data.images ? Array.from(data.images) : [],
    'imageFileList',
  );

  const response = await FORMAPI.post('/api/v1/users/academic-record/application/create', formData);
  return response.data; //
};

export const findId = async (data: User.FindIdRequest): Promise<User.FindIdResponse> => {
  try {
    const response = await API.post<User.FindIdResponse>(`/api/v1/users/user-id/find`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message;
      throw new Error(errorMessage);
    } else {
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
};

export const findPassword = async (data: User.FindPasswordRequest): Promise<void> => {
  try {
    await API.put('/api/v1/users/password/find', data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message;
      throw new Error(errorMessage);
    } else {
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
};

export const resetPassword = async (data: User.ResetPasswordRequest): Promise<void> => {
  const accessToken = getRccAccess();
  try {
    await axios.put(`${BASEURL}/api/v1/users/password`, data, {
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw error;
  }
};
