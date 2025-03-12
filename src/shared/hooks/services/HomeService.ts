import { API } from "@/shared/configs/axios";
import { eventQueryKey } from "@/shared/configs/query-key/eventQueryKey";
import { useQuery } from "@tanstack/react-query";

export const HomeService = () => {
  const useGetEventList = () => {
    return useQuery({
      queryKey: eventQueryKey.list(),
      queryFn: async () => {
        const { data }: { data: Home.GetEventsResponseDto } =
          await API.get("/api/v1/events");
        return data.events;
      },
    });
  };

  return { useGetEventList };
};
