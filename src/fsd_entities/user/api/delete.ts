import { API, BASEURL, setRscHeader } from '@/fsd_shared';

import { USER_COUNCIL_FEE_ENDPOINT, USERS_ENDPOINT } from '../config';

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

// 사용자 '탈퇴' - 본인 계정 탈퇴 (파라미터 없음, 토큰 필요)
export const withdrawUserCSR = async () => {
  const res = await API.delete(`${USERS_ENDPOINT}`);
  return res.status >= 200 && res.status < 300;
};

// ssr api method.
////////////////////////////////////////////////////////////////

// 사용자 영구 삭제.
export const deleteUser = async (userId: string) => {
  const headers = await setRscHeader();
  const response = await fetch(`${BASEURL}${USERS_ENDPOINT}/${userId}/delete`, {
    method: 'DELETE',
    headers: headers,
  });

  if (!response.ok) throw new Error(response.statusText);
  return true;
};

// 사용자 '탈퇴' - SSR 용
export const withdrawUser = async () => {
  const headers = await setRscHeader();
  const response = await fetch(`${BASEURL}${USERS_ENDPOINT}`, {
    method: 'DELETE',
    headers,
  });
  if (!response.ok) throw new Error(response.statusText);
  return true;
};
