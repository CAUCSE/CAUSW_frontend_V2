import { AxiosResponse } from 'axios';

import { API, FORMAPI } from '@/fsd_shared';
import { createFormData } from '@/utils';

import { URI } from '../config';

export const submitAdmissionsApplication = async (
  data: User.AdmissionCreateRequestDto, // FileList 타입 사용
): Promise<any> => {
  try {
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

    const response = await FORMAPI.post(URI + '/admissions/apply', formData);

    return response.data; //
  } catch (error) {
    throw error;
  }
};

export const registerCouncilFee = async (body: any) => {
  try {
    const response = (await API.post(`${URI}-council-fee/create-user`, body)) as AxiosResponse;
    return response;
  } catch (error) {
    throw error;
  }
};
