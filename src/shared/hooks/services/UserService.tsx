import { AxiosResponse } from "axios";

import { API, useUserStore } from "@/shared";

export const UserService = () => {
  const URI = "/api/v1/users";

  const setUserStore = useUserStore((state) => state.setUserStore);

  const getMe = async () => {
    const { data } = (await API.get(`${URI}/me`)) as AxiosResponse<User.User>;

    setUserStore(data);
  };

  const getUserInfo = async () => {
    const response = await API.get(`${URI}/me`);  // 서버로부터 유저 정보를 가져옴
    return response;
  }
  
  const getUserAdmissionInfo = async () => {
    const response = await API.get(`${URI}/admissions/self`);
    return response;
  }

  const updateUserAcademicInfo = async (data: any) => {
    try
  {  const response = (await API.put(`${URI}/academic-record/application/update`, data)) as AxiosResponse;
    return response;
  } catch(error)
  {
    throw error;
  }  
  }
  const checkCurrentAcademicStatus = async () => {
    try {
      const response = (await API.get(`${URI}/academic-record/current`)) as AxiosResponse;
      return response;
    } catch (error){
      throw error;
    }
  }
  const checkIsAcademicRecordSubmitted = async () => {
    try {
      const response = (await API.get(`${URI}/academic-record/current/not-accepted`)) as AxiosResponse;
      return response;
    }
    catch(error)
    {
      throw error;
    }
  }
  
  const allowUser = async (param: string) => {
    try {
      const response = (await API.put(`${URI}/admissions/${param}/accept`)) as AxiosResponse;
      return response;
    }
    catch(error)
    {
      throw error;
    }
  }

  return { getMe, getUserInfo, getUserAdmissionInfo, updateUserAcademicInfo, checkCurrentAcademicStatus, checkIsAcademicRecordSubmitted, allowUser };
};
