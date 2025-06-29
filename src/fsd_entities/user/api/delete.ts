import { API } from '@/fsd_shared';

import { FEE_URL } from '../config';

export const deleteUserCouncilFeeInfo = async (userCouncilFeeId: string) => {
  try {
    const response = await API.delete(`${FEE_URL}/delete`, {
      headers: {
        userCouncilFeeId: userCouncilFeeId,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
