"use client";

import { API, settingQueryKey } from "@/shared";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { AxiosResponse } from "axios";

export const SettingService = () => {
  const URI = "/api/v1/users";

  const getUserByName = async (name: string) => {
    const { data } = (await API.get(`${URI}/name/${name}`)) as AxiosResponse<
      User.User[]
    >;

    return data;
  };

  const updateRole = async (
    id: string,
    role: User.Role,
    circleId: string | null,
  ) => {
    await API.put(`${URI}/${id}/role`, {
      role: role,
      circleId: circleId,
    });
  };

  const useGetAttendanceUser = (id: string) => {
    return useQuery({
      queryKey: ["attendanceUser", id],
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
      queryKey: ["waitingUser", userId, applicationId],
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
      getNextPageParam: (lastPage) => {
        return lastPage.posts.last ? null : lastPage.posts.number + 1;
      },
      select: (data) => {
        return data.pages.flatMap((page) => page.posts.content);
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
      getNextPageParam: (lastPage) => {
        return lastPage.posts.last ? null : lastPage.posts.number + 1;
      },
      select: (data) => {
        return data.pages.flatMap((page) => page.posts.content);
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
      getNextPageParam: (lastPage) => {
        return lastPage.posts.last ? null : lastPage.posts.number + 1;
      },
      select: (data) => {
        return data.pages.flatMap((page) => page.posts.content);
      },
    });
  };

  const getApplyBoards = async (id: string) => {
    const { data } = (await API.get(
      `/api/v1/boards/apply/${id}`,
    )) as AxiosResponse<Setting.GetApplyBoardResponseDto>;

    return data;
  };

  const rejectApplyBoards = async (id: string) => {
    await API.put(`/api/v1/boards/apply/${id}/reject`);
  };

  const acceptApplyBoards = async (id: string) => {
    await API.put(`/api/v1/boards/apply/${id}/accept`);
  };

  const changeAttendanceUserState = async (
    targetUserId: string,
    applicationId: string,
    targetAcademicRecordRequestStatus: string,
    rejectMessage: string,
  ) => {
    await API.put(`/api/v1/users/academic-record/application/admin`, {
      targetUserId,
      applicationId,
      targetAcademicRecordRequestStatus,
      rejectMessage,
    });
  };

  const updateAttendanceUserNote = async (id: string, note: string) => {
    await API.put(`/api/v1/users/academic-record/record/${id}`, note);
  };

  return {
    updateRole,
    useGetAttendanceUser,
    useGetWaitingUser,
    useGetMyPosts,
    useGetMyCommentPosts,
    useGetMyFavoritePosts,
    getApplyBoards,
    getUserByName,
    rejectApplyBoards,
    acceptApplyBoards,
    changeAttendanceUserState,
    updateAttendanceUserNote,
  };
};
