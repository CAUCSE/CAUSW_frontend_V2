import { API, FORMAPI } from '@/fsd_shared';
import { createFormData } from '@/utils';

import { URI } from '../config';

const updateUserAcademicInfo = async (data: any) => {
  try {
    const response = (await API.put(`${URI}/academic-record/application/update`, data)) as AxiosResponse;
    return response;
  } catch (error) {
    throw error;
  }
};

const allowUser = async (param: string) => {
  try {
    const response = (await API.put(`${URI}/admissions/${param}/accept`)) as AxiosResponse;
    return response;
  } catch (error) {
    throw error;
  }
};

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
      'userUpdateDto',
      data.profileImage ? [data.profileImage] : [],
      'profileImage',
    );

    const response = await FORMAPI.put('/api/v1/users', formData);

    return response.data; //
  } catch (error) {
    throw error;
  }
};
