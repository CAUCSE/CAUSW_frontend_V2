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

  return { useGetAttendanceUser, useGetWaitingUser };
};
