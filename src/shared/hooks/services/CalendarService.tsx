import { API, FORMAPI } from "@/shared/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { calendarQueryKey } from "@/shared/configs/query-key";
import toast from "react-hot-toast";
import { useCalendarStore } from "../stores/calendar/useCalendarStore";

export const CalendarService = () => {
  const useGetCalendarList = ({ year }: { year: number }) => {
    return useQuery({
      queryKey: calendarQueryKey.year(year),
      queryFn: async () => {
        const { data }: { data: Calendar.CalendarsResponseDto } = await API.get(
          `/api/v1/calendars?year=${year}`,
        );

        return data;
      },
    });
  };

  const useDeleteCalendar = () => {
    const closeDeleteModal = useCalendarStore(
      (state) => state.closeDeleteModal,
    );
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({
        calendarId,
        calendarYear,
      }: {
        calendarId: string;
        calendarYear: number;
      }) => {
        await API.delete(`/api/v1/calendars/${calendarId}`);
        return calendarYear;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: calendarQueryKey.year(data),
        });
        toast.success("캘린더가 삭제되었습니다");
      },
      onError: () => {
        toast.error("캘린더 삭제를 실패했습니다.");
      },
      onSettled: () => {
        closeDeleteModal();
      },
    });
  };

  const useCreateCalendar = () => {
    const closeAddModal = useCalendarStore((state) => state.closeAddModal);
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({
        calendarImg,
        year,
        month,
      }: {
        calendarImg: File;
        year: number;
        month: number;
      }) => {
        const formData = new FormData();
        formData.append(
          "calendarCreateRequestDto",
          new Blob([JSON.stringify({ year, month })], {
            type: "application/json",
          }),
        );
        formData.append(
          "image",
          new Blob([calendarImg], { type: calendarImg.type }),
          calendarImg.name,
        );

        await FORMAPI.post("/api/v1/calendars", formData);
        return year;
      },
      onSuccess: (year) => {
        queryClient.invalidateQueries({
          queryKey: calendarQueryKey.year(year),
        });
        toast.success("캘린더가 추가되었습니다");
        closeAddModal();
      },
      onError: (error) => {
        if (error.message.includes("code 400")) {
          toast.error("해당 년도와 월의 캘린더가 이미 존재합니다.");
          return;
        }
        toast.error("캘린더 추가를 실패했습니다.");
      },
    });
  };
  return { useGetCalendarList, useDeleteCalendar, useCreateCalendar };
};
