'use client';

import axios, { AxiosResponse } from 'axios';

import { API } from '@/fsd_shared';
import { useUserStore } from '@/shared';

const URI = '/api/v1/users';

export const checkEmailDuplicate = async (email: string): Promise<string | boolean> => {
  try {
    const response = (await API.get(`${URI}/${email}/is-duplicated`)) as AxiosResponse<any>; // 타입 변경
    if (response.data.result === false) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || '이메일 중복검사에 실패했습니다.';
    } else {
      return '알 수 없는 오류가 발생했습니다.';
    }
  }
};

export const checkNicknameDuplicate = async (nickname: string): Promise<string | boolean> => {
  try {
    const response = (await API.get(`${URI}/${nickname}/is-duplicated-nickname`)) as AxiosResponse<any>; // 타입 변경
    if (response.data.result === false) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || '닉네임 중복검사에 실패했습니다.';
    } else {
      return '알 수 없는 오류가 발생했습니다.';
    }
  }
};

export const checkStudentIdDuplicate = async (studentId: string): Promise<boolean | string> => {
  try {
    const response = (await API.get(`${URI}/${studentId}/is-duplicated-student-id`)) as AxiosResponse<any>; // 타입 변경
    if (response.data.result === false) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || '학번 중복검사에 실패했습니다.';
    } else {
      return '알 수 없는 오류가 발생했습니다.';
    }
  }
};

export const getMyInfo = async () => {
  try {
    const response = await API.get(`${URI}/me`); // 서버로부터 유저 정보를 가져옴
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserAdmissionInfo = async () => {
  const response = await API.get(`${URI}/admissions/self`);
  return response;
};

export const checkCurrentAcademicStatus = async () => {
  try {
    const response = (await API.get(`${URI}/academic-record/current`)) as AxiosResponse;
    return response;
  } catch (error) {
    throw error;
  }
};

export const checkIsAcademicRecordSubmitted = async () => {
  try {
    const response = (await API.get(`${URI}/academic-record/current/not-accepted`)) as AxiosResponse;
    return response;
  } catch (error) {
    throw error;
  }
};
