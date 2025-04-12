import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { API, settingQueryKey } from '@/fsd_shared';

import { URI } from '../../config';
import { useUserStore } from '../../model';

export const useUserGetApi = () => {
  // 전 UserService 리팩터링
  const setUserStore = useUserStore(state => state.setUserStore);

  const getMe = async () => {
    const { data } = (await API.get(`${URI}/me`)) as AxiosResponse<User.User & { isV2: boolean }>;

    setUserStore(data);
  };

  const getMyInfo = async () => {
    try {
      const response = await API.get(`${URI}/me`); // 서버로부터 유저 정보를 가져옴
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getUserInfo = async (userId: string) => {
    try {
      const response = await API.get(`${URI}/${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getUserAdmissionInfo = async () => {
    const response = await API.get(`${URI}/admissions/self`);
    return response;
  };

  const checkCurrentAcademicStatus = async () => {
    try {
      const response = (await API.get(`${URI}/academic-record/current`)) as AxiosResponse;
      return response;
    } catch (error) {
      throw error;
    }
  };

  const checkIsAcademicRecordSubmitted = async () => {
    try {
      const response = (await API.get(`${URI}/academic-record/current/not-accepted`)) as AxiosResponse;
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getUserCouncilFeeInfo = async () => {
    try {
      const response = (await API.get(`${URI}-council-fee/isCurrentSemesterApplied/self/info`)) as AxiosResponse;
      return response;
    } catch (error) {
      throw error;
    }
  };

  const checkIsCurrentSemesterApplied = async (userId: string) => {
    try {
      const response =
        (await API.get(`${URI}-council-fee/isCurrentSemesterApplied`),
        {
          headers: {
            params: userId,
          },
        });
      return response;
    } catch (error) {
      return false;
    }
  };

  // 전 SettingService 리팩터링
  const getUserByName = async (name: string) => {
    const { data } = (await API.get(`${URI}/name/${name}`)) as AxiosResponse<User.User[]>;

    return data;
  };

  const useGetAttendanceUser = (id: string) => {
    return useQuery({
      queryKey: ['attendanceUser', id],
      queryFn: async () => {
        const { data } = (await API.get(
          `${URI}/academic-record/record/${id}`,
        )) as AxiosResponse<Setting.GetAttendanceUserResponseDto>;

        return data;
      },
      enabled: !!id,
    });
  };

  const useGetWaitingUser = (userId: string, applicationId: string) => {
    return useQuery({
      queryKey: ['waitingUser', userId, applicationId],
      queryFn: async () => {
        const { data } = (await API.get(
          `${URI}/academic-record/application/${userId}/${applicationId}`,
        )) as AxiosResponse<Setting.GetWaitingUserResponseDto>;

        return data;
      },
      enabled: !!userId,
    });
  };

  const useGetMyPosts = () => {
    return useInfiniteQuery({
      queryKey: settingQueryKey.myPost(),
      queryFn: async ({ pageParam }) => {
        const { data }: { data: User.UserPostsResponseDto } = await API.get(
          `${URI}/posts/written?pageNum=${pageParam}`,
        );
        return data;
      },
      initialPageParam: 0,
      getNextPageParam: lastPage => {
        return lastPage.posts.last ? null : lastPage.posts.number + 1;
      },
      select: data => {
        return data.pages.flatMap(page => page.posts.content);
      },
    });
  };

  const useGetMyCommentPosts = () => {
    return useInfiniteQuery({
      queryKey: settingQueryKey.myCommentPost(),
      queryFn: async ({ pageParam }) => {
        const { data }: { data: User.UserPostsResponseDto } = await API.get(
          `${URI}/comments/written?pageNum=${pageParam}`,
        );
        return data;
      },
      initialPageParam: 0,
      getNextPageParam: lastPage => {
        return lastPage.posts.last ? null : lastPage.posts.number + 1;
      },
      select: data => {
        return data.pages.flatMap(page => page.posts.content);
      },
    });
  };

  const useGetMyFavoritePosts = () => {
    return useInfiniteQuery({
      queryKey: settingQueryKey.myFavoritePost(),
      queryFn: async ({ pageParam }) => {
        const { data }: { data: User.UserPostsResponseDto } = await API.get(
          `${URI}/posts/favorite?pageNum=${pageParam}`,
        );
        return data;
      },
      initialPageParam: 0,
      getNextPageParam: lastPage => {
        return lastPage.posts.last ? null : lastPage.posts.number + 1;
      },
      select: data => {
        return data.pages.flatMap(page => page.posts.content);
      },
    });
  };

  const getApplyBoards = async (id: string) => {
    const { data } = (await API.get(`/api/v1/boards/apply/${id}`)) as AxiosResponse<Setting.GetApplyBoardResponseDto>;

    return data;
  };

  return {
    getMe,
    getMyInfo,
    getUserInfo,
    getUserAdmissionInfo,
    checkCurrentAcademicStatus,
    checkIsAcademicRecordSubmitted,
    getUserCouncilFeeInfo,
    checkIsCurrentSemesterApplied,
    getUserByName,
    useGetAttendanceUser,
    useGetWaitingUser,
    useGetMyPosts,
    useGetMyCommentPosts,
    useGetMyFavoritePosts,
    getApplyBoards,
  };
};
