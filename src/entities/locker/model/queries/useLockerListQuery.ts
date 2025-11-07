import { useQuery } from '@tanstack/react-query';

import { getLockerList } from '../../api';
import { lockerQueryKey } from '../../config';

export const useLockerListQuery = (locationId: string) =>
  useQuery({
    queryKey: lockerQueryKey.list(locationId),
    queryFn: () => getLockerList(locationId),
  });
