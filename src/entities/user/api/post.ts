import { createFormData } from '@/shared/lib';

import { BASEURL, FORMAPI, setRscHeader } from '@/shared';

import { USERS_ENDPOINT } from '../config';

// csr api method.
////////////////////////////////////////////////////////////////

export const submitAdmissionsApplication = async (
  data: User.AdmissionCreateRequestDto, // FileList 타입 사용
): Promise<unknown> => {
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

    const response = await FORMAPI.post(
      USERS_ENDPOINT + '/admissions/apply',
      formData,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// ssr api method.
////////////////////////////////////////////////////////////////

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
