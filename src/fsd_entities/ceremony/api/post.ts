import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

import { API } from '@/shared';

export const cancelCeremonyRegist = async ({ ceremonyId }: { ceremonyId: string }) => {
  const URI = `/api/v1/ceremony/state/close/${ceremonyId}`;
  try {
    const response = await API.put(URI);
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

export const updateAdminCeremonyState = async ({
  ceremonyId,
  targetCeremonyState,
  rejectMessage,
}: {
  ceremonyId: string;
  targetCeremonyState: 'ACCEPT' | 'REJECT' | 'AWAIT' | 'CLOSE';
  rejectMessage?: string;
}) => {
  const URI = `/api/v1/ceremony/state`;
  try {
    const response = await API.put(URI, {
      ceremonyId,
      targetCeremonyState,
      rejectMessage,
    });
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
