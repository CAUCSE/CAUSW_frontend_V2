import { API } from "@/shared/configs/axios";
import { calendarQueryKey } from "@/shared/configs/query-key";
import { useQuery } from "@tanstack/react-query";

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
  return { useGetCalendarList };
};
