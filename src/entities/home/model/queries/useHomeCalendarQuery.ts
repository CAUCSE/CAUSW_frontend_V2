import { useQuery } from "@tanstack/react-query";
import { getCalendars } from "../../api";
import { homeQueryKey } from "../../config/queryKey/homeQueryKey";


export const useHomeCalendarQuery = (year: number) => {
  return useQuery<Home.GetCalendarsResponseDto> ({
    queryKey: homeQueryKey.calendars(year),
    queryFn: () => getCalendars(year),
  });
};


