import { BASEURL, setRscHeader } from '@/fsd_shared';

import { PAGE_SIZE, URI } from '../../config';

const SSR_URI = BASEURL + URI;

//함수 생성자
const setGetMethod = (endpoint: string) => {
  return async (page: number = 0, size: number = PAGE_SIZE) => {
    try {
      const headers = await setRscHeader();

      const response = await fetch(`${BASEURL}/api/v1/${endpoint}?page=${page}&size=${size}`, {
        headers: headers,
      }).then(res => res.json());

      if (response.errorCode) throw new Error(response.errorCode);

      return response.content;
    } catch (error) {
      throw error;
    }
  };
};

export const getMe = async () => {
  try {
    const headers = await setRscHeader();
    const response = (await fetch(`${SSR_URI}/me`, { headers: headers }).then(res => res.json())) as User.UserDto;

    if (response.errorCode) throw new Error(response.errorCode);

    return response;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (id: string) => {
  try {
    const headers = await setRscHeader();
    const response = (await fetch(`${SSR_URI}/${id}`, { headers: headers }).then(res => res.json())) as User.UserDto;

    if (response.errorCode) throw new Error(response.errorCode);

    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserAcademicRecord = async (id: string) => {
  try {
    const headers = await setRscHeader();
    const response = (await fetch(`${SSR_URI}/academic-record/record/${id}`, { headers: headers }).then(res =>
      res.json(),
    )) as any;

    if (response.errorCode) throw new Error(response.errorCode);

    return response;
  } catch (error) {
    throw error;
  }
};

export const getMyCircles = async () => {
  try {
    const headers = await setRscHeader();

    const response = (await fetch(`${SSR_URI}/circles`, {
      headers: headers,
    }).then(res => res.json())) as Circle.CirclesRequestDto;

    if (response.errorCode) throw new Error(response.errorCode);

    return response;
  } catch (error) {
    throw error;
  }
};

//유저 상태 조회
export const getByState = async (state: User.UserDto['state'], name: string | null, page: number) => {
  try {
    const headers = await setRscHeader();

    const response = name
      ? ((await fetch(`${SSR_URI}/state/${state}?name=${name}&pageNum=${page}`, {
          headers: headers,
        }).then(res => res.json())) as Setting.GetByStateResponseDto)
      : ((await fetch(`${SSR_URI}/state/${state}?pageNum=${page}`, {
          headers: headers,
        }).then(res => res.json())) as Setting.GetByStateResponseDto);

    if (response.errorCode) throw new Error(response.errorCode);

    return response;
  } catch (error) {
    throw error;
  }
};

//특수 권한 조회
export const getPrivilegedUsers = async () => {
  try {
    const headers = await setRscHeader();

    const response = (await fetch(`${SSR_URI}/privileged`, {
      headers: headers,
    }).then(res => res.json())) as Setting.GetPrivilegedUsersResponseDto;

    if (response.errorCode) throw new Error(response.errorCode);

    return response;
  } catch (error) {
    throw error;
  }
};

//가입 대기 유저 조회
export const getAllAdmissions = async (name: string | null, page: number) => {
  try {
    const headers = await setRscHeader();

    const response = name
      ? ((await fetch(`${SSR_URI}/admissions?name=${name}&pageNum=${page}`, {
          headers: headers,
        }).then(res => res.json())) as Setting.GetAllAdmissionsResponseDto)
      : ((await fetch(`${SSR_URI}/admissions?pageNum=${page}`, {
          headers: headers,
        }).then(res => res.json())) as Setting.GetAllAdmissionsResponseDto);

    if (response.errorCode) throw new Error(response.message);

    return response;
  } catch (error) {
    throw error;
  }
};

export const getAdmission = async (userId: string) => {
  const header = await setRscHeader();
  const response = await fetch(`${SSR_URI}/admissions/${userId}`, {
    method: 'GET',
    headers: header,
  });

  const data = (await response.json()) as Setting.GetAdmissionResponseDto;
  if (!response.ok) throw new Error(response.statusText);
  return data;
};

//납부자 조회
export const getPayers = setGetMethod('user-council-fee/list') as (
  page?: number,
  size?: number,
) => Promise<Setting.Payer[]>;

//학적 인증 전체 조회
export const getAllAttendanceUsers = setGetMethod('users/academic-record/list/active-users') as (
  page?: number,
  size?: number,
) => Promise<Setting.UserElement[]>;

//학적 인증 요청 사용자 조회
export const getWaitingUsers = setGetMethod('users/academic-record/list/await') as (
  page?: number,
  size?: number,
) => Promise<Setting.WaitingUsers[]>;

// 납부자 상세 조회
export const getUserCouncilFeeInfo = async (userCouncilFeeId: string) => {
  const headers = await setRscHeader();
  const response = await fetch(`${BASEURL}/api/v1/user-council-fee/info/${userCouncilFeeId}`, {
    method: 'GET',
    headers: headers,
  });

  if (!response.ok) throw new Error(response.statusText);

  return (await response.json()) as Setting.UserCouncilFeeInfoDTO;
};

//게시판 신청 목록 조회
export const getApplyBoards = async () => {
  try {
    const headers = await setRscHeader();

    const response = (await fetch(`${BASEURL}/api/v1/boards/apply/list`, {
      headers: headers,
    }).then(res => res.json())) as Setting.GetApplyBoardsResponseDto;

    if (response.errorCode) throw new Error(response.errorCode);

    return response;
  } catch (error) {
    throw error;
  }
};
