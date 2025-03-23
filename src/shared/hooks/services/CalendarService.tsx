import { API } from "@/shared/configs/axios";
import { calendarQueryKey } from "@/shared/configs/query-key";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    const closeModal = useCalendarStore((state) => state.closeModal);
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
        closeModal();
      },
    });
  };
  return { useGetCalendarList, useDeleteCalendar };
};
