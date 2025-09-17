import { useMutation, useQueryClient } from '@tanstack/react-query';

import { putLockerExtenstion } from '../../api';
import { lockerQueryKey } from '../../config';

export const useExtendLockerMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (lockerId: string) => putLockerExtenstion(lockerId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: lockerQueryKey.all });
    },
  });
};
