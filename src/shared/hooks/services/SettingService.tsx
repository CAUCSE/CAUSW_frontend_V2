"use client";

import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { API } from "@/shared";
import { useQuery } from "@tanstack/react-query";

export const SettingService = () => {
  const URI = "/api/v1/users";

  const router = useRouter();

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
    console.log(applicationId);
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

  const getMyPosts = async () => {
    const { data } = (await API.get(
      `${URI}/posts/written`,
    )) as AxiosResponse<Setting.GetMyPostsResponseDto>;

    return data.posts.content;
  };

  const getMyCommentPosts = async () => {
    const { data } = (await API.get(
      `${URI}/comments/written`,
    )) as AxiosResponse<Setting.GetMyPostsResponseDto>;

    return data.posts.content;
  };

  const getMyFavoritePosts = async () => {
    const { data } = (await API.get(
      `${URI}/posts/favorite`,
    )) as AxiosResponse<Setting.GetMyPostsResponseDto>;

    return data.posts.content;
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
    getMyPosts,
    getMyCommentPosts,
    getMyFavoritePosts,
    getApplyBoards,
    getUserByName,
    rejectApplyBoards,
    acceptApplyBoards,
    changeAttendanceUserState,
    updateAttendanceUserNote,
  };
};
