import { useQuery } from '@tanstack/react-query';

import { getLockerLocations } from '../../api';
import { lockerQueryKey } from '../../config';

export const useLockerLocationsQuery = () =>
  useQuery({ queryKey: lockerQueryKey.locations(), queryFn: getLockerLocations });
