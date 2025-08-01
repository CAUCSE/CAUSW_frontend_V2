import { API, calendarQueryKey } from "@/fsd_shared";
import { useQuery } from "@tanstack/react-query";

export const useGetCalendarList = ({ year }: { year: number }) => {
    return useQuery({
      queryKey: calendarQueryKey.year(year),
      queryFn: async () => {
        const { data }: { data: Calendar.CalendarsResponseDto } = await API.get(`/api/v1/calendars?year=${year}`);

        return data;
      },
    });
  };