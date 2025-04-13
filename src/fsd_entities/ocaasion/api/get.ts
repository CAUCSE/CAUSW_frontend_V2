import axios, { AxiosResponse, isAxiosError } from 'axios';
import toast from 'react-hot-toast';

import { API } from '@/fsd_shared';

export const getCeremonyAwaitList = async (page: number, size: number, sort?: string[]) => {
  const URI = `/api/v1/ceremony/list/await`;

  const params = {
    page: page.toString(),
    size: size.toString(),
    ...(sort && { sort: sort.join(',') }),
  };

  try {
    const response = (await API.get(URI, { params })) as AxiosResponse<any>;

    if (response.status !== 200) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.data?.content?.length ? response.data.content : [];
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error('Axios error:', error.response?.data);
    } else {
      toast.error('General error');
    }
    throw error;
  }
};

export const getCeremonyDetail = async (idx: string) => {
  const URI = `/api/v1/ceremony/${idx}`;

  try {
    const response = await API.get(URI);

    if (response.status !== 200) {
      throw new Error(`Error: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error('Axios error:', error.response?.data);
    } else {
      toast.error('General error');
    }
    throw error;
  }
};
