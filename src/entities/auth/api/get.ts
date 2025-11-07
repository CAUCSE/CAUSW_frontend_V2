'use client';

import axios, { AxiosResponse } from 'axios';

import { API } from '@/shared';

const URI = '/api/v1/users';

export const checkEmailDuplicate = async (
  email: string,
): Promise<string | boolean> => {
  try {
    const response = (await API.get(
      `${URI}/${email}/is-duplicated`,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    )) as AxiosResponse<any>; // 타입 변경
    return response.data.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || '이메일 중복검사에 실패했습니다.';
    } else {
      return '알 수 없는 오류가 발생했습니다.';
    }
  }
};

export const checkNicknameDuplicate = async (
  nickname: string,
): Promise<string | boolean> => {
  try {
    const response = (await API.get(
      `${URI}/${nickname}/is-duplicated-nickname`,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    )) as AxiosResponse<any>; // 타입 변경
    return response.data.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || '닉네임 중복검사에 실패했습니다.';
    } else {
      return '알 수 없는 오류가 발생했습니다.';
    }
  }
};

export const checkStudentIdDuplicate = async (
  studentId: string,
): Promise<boolean | string> => {
  try {
    const response = (await API.get(
      `${URI}/${studentId}/is-duplicated-student-id`,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    )) as AxiosResponse<any>; // 타입 변경
    return response.data.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || '학번 중복검사에 실패했습니다.';
    } else {
      return '알 수 없는 오류가 발생했습니다.';
    }
  }
};

export const checkPhoneNumberDuplicate = async (
  phoneNumber: string,
): Promise<boolean | string> => {
  try {
    const response = (await API.get(
      `${URI}/${phoneNumber}/is-duplicated-phone-number`,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    )) as AxiosResponse<any>; // 타입 변경
    return response.data.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return (
        error.response?.data?.message || '연락처 중복 검사에 실패했습니다.'
      );
    } else {
      return '알 수 없는 오류가 발생했습니다.';
    }
  }
};

export const checkCurrentAcademicStatus = async () => {
  try {
    const response = (await API.get(
      `${URI}/academic-record/current`,
    )) as AxiosResponse;
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserAdmissionInfo = async () => {
  await API.get(`${URI}/admissions/self`);
};

export const checkIsAcademicRecordSubmitted = async () => {
  try {
    const response = await API.get(
      `${URI}/academic-record/current/not-accepted`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};
