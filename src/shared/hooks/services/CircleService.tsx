'use client';

import { AxiosResponse } from 'axios';

import { API, FORMAPI } from '@/shared';

//import { useRouter } from "next/navigation";

export const CircleService = () => {
  const URI = '/api/v1/circles';
  //const router = useRouter();

  const editCircle = async (id: string, body: FormData) => {
    await FORMAPI.put(`${URI}/${id}`, body);

    window.location.href = '/circle/' + id;
  };

  const dropMember = async (userId: string, circleId: string) => {
    try {
      const response = (await API.put(`${URI}/${circleId}/users/${userId}/drop`)) as AxiosResponse;
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getApplication = async (id: string) => {
    const { data } = (await API.get(`/api/v1/circles/${id}/apply/application`)) as AxiosResponse<any>;

    return data;
  };

  const checkApplication = async (id: string) => {
    const { data } = (await API.get(`/api/v1/circles/${id}/apply/application/is-exist`)) as AxiosResponse<any>;

    return data;
  };

  const editCircleApplication = async (id: string, body: any) => {
    const { data } = (await API.post(`/api/v1/circles/${id}/apply/application`, body)) as AxiosResponse<any>;
  };

  const applyCircle = async (id: string, body: any) => {
    const { data } = (await API.post(`/api/v1/circles/${id}/applications`, body)) as AxiosResponse<any>;
  };

  const getApplicationById = async (circleid: string, userId: string) => {
    const { data } = (await API.get(`/api/v1/forms/${userId}/${circleid}`)) as AxiosResponse<Circle.ApplyResponseDto>;

    return data[data.length - 1];
  };

  const rejectApplyUser = async (id: string) => {
    await API.put(`${URI}/applications/${id}/reject`);
  };

  const acceptApplyUser = async (id: string) => {
    await API.put(`${URI}/applications/${id}/accept`);
  };

  return {
    editCircle,
    dropMember,
    getApplication,
    checkApplication,
    editCircleApplication,
    applyCircle,
    acceptApplyUser,
    rejectApplyUser,
    getApplicationById,
  };
};
