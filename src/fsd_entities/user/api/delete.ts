import { API, BASEURL, setRscHeader } from '@/fsd_shared';

import { USER_COUNCIL_FEE_ENDPOINT, USERS_ENDPOINT } from '../config';

const SSR_URL = BASEURL + USERS_ENDPOINT;

// csr api method.
////////////////////////////////////////////////////////////////

export const deleteUserCouncilFeeInfo = async (userCouncilFeeId: string) => {
  try {
    const response = await API.delete(`${USER_COUNCIL_FEE_ENDPOINT}/delete`, {
      headers: {
        userCouncilFeeId: userCouncilFeeId,
      },
    });
    return response;
  } catch (error) {
    throw error;
    screenTop;
  }
};

// ssr api method.
////////////////////////////////////////////////////////////////

// 사용자 영구 삭제.
export const deleteUser = async (userId: string) => {
  const headers = await setRscHeader();
  const response = await fetch(`${SSR_URL}/${userId}/delete`, {
    method: 'DELETE',
    headers: headers,
  });

  if (!response.ok) throw new Error(response.statusText);
  return true;
};
