import { AxiosResponse } from 'axios';

import { API } from '@/fsd_shared';
import { useUserStore } from '@/shared';

import { URI } from '../../config';

export const useUserGetApi = () => {
  const setUserStore = useUserStore(state => state.setUserStore);

  const getMe = async () => {
    const { data } = (await API.get(`${URI}/me`)) as AxiosResponse<User.User & { isV2: boolean }>;

    setUserStore(data);
  };

  const getMyInfo = async () => {
    try {
      const response = await API.get(`${URI}/me`); // 서버로부터 유저 정보를 가져옴
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getUserInfo = async (userId: string) => {
    try {
      const response = await API.get(`${URI}/${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getUserAdmissionInfo = async () => {
    const response = await API.get(`${URI}/admissions/self`);
    return response;
  };

  const checkCurrentAcademicStatus = async () => {
    try {
      const response = (await API.get(`${URI}/academic-record/current`)) as AxiosResponse;
      return response;
    } catch (error) {
      throw error;
    }
  };

  const checkIsAcademicRecordSubmitted = async () => {
    try {
      const response = (await API.get(`${URI}/academic-record/current/not-accepted`)) as AxiosResponse;
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getUserCouncilFeeInfo = async () => {
    try {
      const response = (await API.get(`${URI}-council-fee/isCurrentSemesterApplied/self/info`)) as AxiosResponse;
      return response;
    } catch (error) {
      throw error;
    }
  };

  const checkIsCurrentSemesterApplied = async (userId: string) => {
    try {
      const response =
        (await API.get(`${URI}-council-fee/isCurrentSemesterApplied`),
        {
          headers: {
            params: userId,
          },
        });
      return response;
    } catch (error) {
      return false;
    }
  };

  return {
    getMe,
    getMyInfo,
    getUserInfo,
    getUserAdmissionInfo,
    checkCurrentAcademicStatus,
    checkIsAcademicRecordSubmitted,
    getUserCouncilFeeInfo,
    checkIsCurrentSemesterApplied,
  };
};
