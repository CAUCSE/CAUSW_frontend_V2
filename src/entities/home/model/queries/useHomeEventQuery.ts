import { useQuery } from '@tanstack/react-query';

import { getEvents } from '../../api';
import { homeQueryKey } from '../../config/queryKey/homeQueryKey';

export const useHomeEventQuery = () => {
  return useQuery<Home.GetEventsResponseDto>({
    queryKey: homeQueryKey.events(),
    queryFn: () => getEvents(),
  });
};
