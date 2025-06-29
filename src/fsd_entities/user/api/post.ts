import { AxiosResponse } from 'axios';

import { API, BASEURL, FORMAPI, setRscHeader } from '@/fsd_shared';
import { createFormData } from '@/utils';

import { FEE_URL, URL } from '../config';

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

    const response = await FORMAPI.post(URL + '/admissions/apply', formData);

    return response.data; //
  } catch (error) {
    throw error;
  }
};

export const registerCouncilFee = async (body: any) => {
  try {
    const response = (await API.post(`${FEE_URL}/create-user`, body)) as AxiosResponse;
    return response;
  } catch (error) {
    throw error;
  }
};

export const addPayer = async (
  userId: string,
  paidAt: number,
  numOfPaidSemester: number,
  isRefunded: boolean,
  refundedAt?: number,
) => {
  const headers = await setRscHeader();
  await fetch(`${BASEURL}/api/v1/user-council-fee/create-user`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      paidAt,
      numOfPaidSemester,
      isRefunded,
      refundedAt,
    }),
  });
  return true;
};
