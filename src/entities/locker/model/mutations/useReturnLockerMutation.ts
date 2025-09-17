import { useMutation, useQueryClient } from '@tanstack/react-query';

import { putLockerReturn } from '../../api';
import { lockerQueryKey } from '../../config';

export const useReturnLockerMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (lockerId: string) => putLockerReturn(lockerId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: lockerQueryKey.all });
    },
  });
};
