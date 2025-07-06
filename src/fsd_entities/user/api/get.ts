import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { API, setRscHeader } from '@/fsd_shared';
import { BASEURL } from '@/fsd_shared';

import { PAGE_SIZE, USER_COUNCIL_FEE_ENDPOINT, USERS_ENDPOINT } from '../config';
import { settingQueryKey } from '../config';

const SSR_URL = BASEURL + USERS_ENDPOINT;

// factory function.
////////////////////////////////////////////////////////////////

const setGetMethod = (endpoint: string) => {
  return async (page: number = 0, size: number = PAGE_SIZE) => {
    try {
      const headers = await setRscHeader();

      const response = await fetch(`${BASEURL}/api/v1/${endpoint}?page=${page}&size=${size}`, {
        headers: headers,
      }).then((res) => res.json());

      if (response.errorCode) throw new Error(response.errorCode);

      return response.content;
    } catch (error) {
      throw error;
    }
  };
};

// csr api method.
////////////////////////////////////////////////////////////////

export const getMyInfo = async () => {
  try {
    const response = (await API.get(`${USERS_ENDPOINT}/me`)) as AxiosResponse<User.UserDto>; // 서버로부터 유저 정보를 가져옴
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserInfo = async (userId: string) => {
  try {
    const response = await API.get(`${USERS_ENDPOINT}/${userId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserAdmissionInfo = async () => {
  const response = await API.get(`${USERS_ENDPOINT}/admissions/self`);
  return response;
};

export const checkCurrentAcademicStatus = async () => {
  try {
    const response = (await API.get(`${USERS_ENDPOINT}/academic-record/current`)) as AxiosResponse;
    return response;
  } catch (error) {
    throw error;
  }
};

export const checkIsAcademicRecordSubmitted = async () => {
  try {
    const response = (await API.get(`${USERS_ENDPOINT}/academic-record/current/not-accepted`)) as AxiosResponse;
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserByName = async (name: string) => {
  const { data } = (await API.get(`${USERS_ENDPOINT}/name/${name}`)) as AxiosResponse<User.User[]>;

  return data;
};

export const useGetAttendanceUser = (id: string) => {
  return useQuery({
    queryKey: ['attendanceUser', id],
    queryFn: async () => {
      const { data } = (await API.get(
        `${USERS_ENDPOINT}/academic-record/record/${id}`,
      )) as AxiosResponse<Setting.GetAttendanceUserResponseDto>;

      return data;
    },
    enabled: !!id,
  });
};

export const useGetWaitingUser = (userId: string, applicationId: string) => {
  return useQuery({
    queryKey: ['waitingUser', userId, applicationId],
    queryFn: async () => {
      const { data } = (await API.get(
        `${USERS_ENDPOINT}/academic-record/application/${userId}/${applicationId}`,
      )) as AxiosResponse<Setting.GetWaitingUserResponseDto>;

      return data;
    },
    enabled: !!userId,
  });
};

export const useGetMyPosts = () => {
  return useInfiniteQuery({
    queryKey: settingQueryKey.myPost(),
    queryFn: async ({ pageParam }) => {
      const { data }: { data: User.UserPostsResponseDto } = await API.get(
        `${USERS_ENDPOINT}/posts/written?pageNum=${pageParam}`,
      );
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.posts.last ? null : lastPage.posts.number + 1;
    },
    select: (data) => {
      return data.pages.flatMap((page) => page.posts.content);
    },
  });
};

export const useGetMyCommentPosts = () => {
  return useInfiniteQuery({
    queryKey: settingQueryKey.myCommentPost(),
    queryFn: async ({ pageParam }) => {
      const { data }: { data: User.UserPostsResponseDto } = await API.get(
        `${USERS_ENDPOINT}/comments/written?pageNum=${pageParam}`,
      );
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.posts.last ? null : lastPage.posts.number + 1;
    },
    select: (data) => {
      return data.pages.flatMap((page) => page.posts.content);
    },
  });
};

export const useGetMyFavoritePosts = () => {
  return useInfiniteQuery({
    queryKey: settingQueryKey.myFavoritePost(),
    queryFn: async ({ pageParam }) => {
      const { data }: { data: User.UserPostsResponseDto } = await API.get(
        `${USERS_ENDPOINT}/posts/favorite?pageNum=${pageParam}`,
      );
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.posts.last ? null : lastPage.posts.number + 1;
    },
    select: (data) => {
      return data.pages.flatMap((page) => page.posts.content);
    },
  });
};

export const getApplyBoardById = async (id: string) => {
  const { data } = (await API.get(`/api/v1/boards/apply/${id}`)) as AxiosResponse<Setting.GetApplyBoardResponseDto>;

  return data;
};

export const getMyCouncilFeeInfo = async () => {
  try {
    const response = (await API.get(
      `${USER_COUNCIL_FEE_ENDPOINT}/isCurrentSemesterApplied/self/info`,
    )) as AxiosResponse;
    return response;
  } catch (error) {
    throw error;
  }
};

// ssr api method.
////////////////////////////////////////////////////////////////

export const getUser = async (id: string) => {
  try {
    const headers = await setRscHeader();
    const response = (await fetch(`${SSR_URL}/${id}`, { headers: headers }).then((res) => res.json())) as User.UserDto;

    if (response.errorCode) throw new Error(response.errorCode);

    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserAcademicRecord = async (id: string) => {
  try {
    const headers = await setRscHeader();
    const response = (await fetch(`${SSR_URL}/academic-record/record/${id}`, { headers: headers }).then((res) =>
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

    const response = (await fetch(`${SSR_URL}/circles`, {
      headers: headers,
    }).then((res) => res.json())) as Circle.CirclesRequestDto;

    if (response.errorCode) throw new Error(response.errorCode);

    return response;
  } catch (error) {
    throw error;
  }
};

// 유저 상태 조회.
export const getByState = async (state: User.UserDto['state'], name: string | null, page: number) => {
  try {
    const headers = await setRscHeader();

    const response = name
      ? ((await fetch(`${SSR_URL}/state/${state}?name=${name}&pageNum=${page}`, {
          headers: headers,
        }).then((res) => res.json())) as Setting.GetByStateResponseDto)
      : ((await fetch(`${SSR_URL}/state/${state}?pageNum=${page}`, {
          headers: headers,
        }).then((res) => res.json())) as Setting.GetByStateResponseDto);

    if (response.errorCode) throw new Error(response.errorCode);

    return response;
  } catch (error) {
    throw error;
  }
};

// 특수 권한 조회.
export const getPrivilegedUsers = async () => {
  try {
    const headers = await setRscHeader();

    const response = (await fetch(`${SSR_URL}/privileged`, {
      headers: headers,
    }).then((res) => res.json())) as Setting.GetPrivilegedUsersResponseDto;

    if (response.errorCode) throw new Error(response.errorCode);

    return response;
  } catch (error) {
    throw error;
  }
};

// 가입 대기 유저 조회.
export const getAllAdmissions = async (name: string | null, page: number) => {
  try {
    const headers = await setRscHeader();

    const response = name
      ? ((await fetch(`${SSR_URL}/admissions?name=${name}&pageNum=${page}`, {
          headers: headers,
        }).then((res) => res.json())) as Setting.GetAllAdmissionsResponseDto)
      : ((await fetch(`${SSR_URL}/admissions?pageNum=${page}`, {
          headers: headers,
        }).then((res) => res.json())) as Setting.GetAllAdmissionsResponseDto);

    if (response.errorCode) throw new Error(response.message);

    return response;
  } catch (error) {
    throw error;
  }
};

export const getAdmission = async (userId: string) => {
  const header = await setRscHeader();
  const response = await fetch(`${SSR_URL}/admissions/${userId}`, {
    method: 'GET',
    headers: header,
  });

  const data = (await response.json()) as Setting.GetAdmissionResponseDto;
  if (!response.ok) throw new Error(response.statusText);
  return data;
};

// 납부자 조회.
export const getPayers = setGetMethod('user-council-fee/list') as (
  page?: number,
  size?: number,
) => Promise<Setting.Payer[]>;

// 학적 인증 전체 조회.
export const getAllAttendanceUsers = setGetMethod('users/academic-record/list/active-users') as (
  page?: number,
  size?: number,
) => Promise<Setting.UserElement[]>;

// 학적 인증 요청 사용자 조회.
export const getWaitingUsers = setGetMethod('users/academic-record/list/await') as (
  page?: number,
  size?: number,
) => Promise<Setting.WaitingUsers[]>;

// 게시판 신청 목록 조회.
export const getApplyBoardList = async () => {
  try {
    const headers = await setRscHeader();

    const response = (await fetch(`${BASEURL}/api/v1/boards/apply/list`, {
      headers: headers,
    }).then((res) => res.json())) as Setting.GetApplyBoardsResponseDto;

    if (response.errorCode) throw new Error(response.errorCode);

    return response;
  } catch (error) {
    throw error;
  }
};

// 납부자 상세 조회.
export const getUserCouncilFeeInfo = async (userCouncilFeeId: string) => {
  const headers = await setRscHeader();
  const response = await fetch(`${BASEURL}/api/v1/user-council-fee/info/${userCouncilFeeId}`, {
    method: 'GET',
    headers: headers,
  });

  if (!response.ok) throw new Error(response.statusText);

  return (await response.json()) as Setting.UserCouncilFeeInfoDTO;
};

export const getApplyBoards = async () => {
  try {
    const headers = await setRscHeader();

    const response = (await fetch(`${BASEURL}/api/v1/boards/apply/list`, {
      headers: headers,
    }).then((res) => res.json())) as Setting.GetApplyBoardsResponseDto;

    if (response.errorCode) throw new Error(response.errorCode);

    return response;
  } catch (error) {
    throw error;
  }
};
