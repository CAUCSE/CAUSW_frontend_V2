import { AxiosResponse } from "axios";

import { API, FORMAPI, useUserStore } from "@/shared";
import { createFormData } from "@/utils";

export const UserService = () => {
  const URI = "/api/v1/users";

  const setUserStore = useUserStore((state) => state.setUserStore);

  const getMe = async () => {
    const { data } = (await API.get(`${URI}/me`)) as AxiosResponse<
      User.User & { isV2: boolean }
    >;

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

  const updateVTwo = async () => {
    await API.put(`${URI}/update/isV2`);
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

  const updateUserAcademicInfo = async (data: any) => {
    try {
      const response = (await API.put(
        `${URI}/academic-record/application/update`,
        data,
      )) as AxiosResponse;
      return response;
    } catch (error) {
      throw error;
    }
  };
  const checkCurrentAcademicStatus = async () => {
    try {
      const response = (await API.get(
        `${URI}/academic-record/current`,
      )) as AxiosResponse;
      return response;
    } catch (error) {
      throw error;
    }
  };
  const checkIsAcademicRecordSubmitted = async () => {
    try {
      const response = (await API.get(
        `${URI}/academic-record/current/not-accepted`,
      )) as AxiosResponse;
      return response;
    } catch (error) {
      throw error;
    }
  };

  const allowUser = async (param: string) => {
    try {
      const response = (await API.put(
        `${URI}/admissions/${param}/accept`,
      )) as AxiosResponse;
      return response;
    } catch (error) {
      throw error;
    }
  };

  const submitAdmissionsApplication = async (
    data: User.AdmissionCreateRequestDto, // FileList 타입 사용
  ): Promise<any> => {
    try {
      const payload = {
        ...data,
        images: undefined, 
      };

      const formData = createFormData(
        payload,
        "userAdmissionCreateRequestDto", 
        data.attachImage ? Array.from(data.attachImage) : [], 
        "userAdmissionAttachImageList" 
      );
  
      const response = await FORMAPI.post(
        "/api/v1/users/admissions/apply",
        formData,
      );
  
      return response.data; //
    } catch (error) {
      throw error;
    }};


  const updateInfo = async (
    data: User.userUpdateDto, // FileList 타입 사용
  ): Promise<any> => {
    try {
      const payload = {
        ...data,
        images: undefined, 
      };

      const formData = createFormData(
        payload,
        "userUpdateDto", 
        data.profileImage ? [data.profileImage] : [], 
        "profileImage" 
      );
  
      const response = await FORMAPI.put(
        "/api/v1/users",
        formData,
      );
  
      return response.data; //
    } catch (error) {
      throw error;
    }};


  return {
    getMe,
    getMyInfo,
    getUserInfo,
    updateVTwo,
    getUserAdmissionInfo,
    updateUserAcademicInfo,
    checkCurrentAcademicStatus,
    checkIsAcademicRecordSubmitted,
    allowUser,
    submitAdmissionsApplication,
    updateInfo,
  };
};
