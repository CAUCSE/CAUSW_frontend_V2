"use client";

import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { API } from "@/shared";
import { useQuery } from "@tanstack/react-query";

export const SettingService = () => {
  const URI = "/api/v1/users";

  const router = useRouter();

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
      enabled: !!userId && !!applicationId,
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

  return {
    useGetAttendanceUser,
    useGetWaitingUser,
    getMyPosts,
    getMyCommentPosts,
    getMyFavoritePosts,
  };
};
