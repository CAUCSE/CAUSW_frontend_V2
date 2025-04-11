import axios from 'axios';

import { API, setRscHeader } from '@/fsd_shared';

export const getCeremonyAwaitList = async (page: number, size: number, sort?: string[]) => {
  const URI = `/api/v1/ceremony/list/await`;

  const params = {
    page: page.toString(),
    size: size.toString(),
    ...(sort && { sort: sort.join(',') }),
  };

  try {
    const headers = await setRscHeader();
    const response = await API.get(URI, { params, headers });

    if (response.status !== 200) {
      throw new Error(`Error: ${response.status}`);
    }

    return response.data?.content?.length ? response.data.content : [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data);
    } else {
      console.error('General error:', error);
    }
    throw error;
  }
};

export const getCeremonyDetail = async (idx: string) => {
  const URI = `/api/v1/ceremony/${idx}`;

  try {
    const headers = await setRscHeader();
    const response = await API.get(URI, { headers });

    if (response.status !== 200) {
      throw new Error(`Error: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data);
    } else {
      console.error('General error:', error);
    }
    throw error;
  }
};
