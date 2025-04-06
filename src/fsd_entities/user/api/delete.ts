import { API } from '@/fsd_shared';

import { URI } from '../config';

export const deleteUserCouncilFeeInfo = async (userCouncilFeeId: string) => {
  try {
    const response = await API.delete(`${URI}-council-fee/delete`, {
      headers: {
        userCouncilFeeId: userCouncilFeeId,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
