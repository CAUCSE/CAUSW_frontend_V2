import { useMutation, useQueryClient } from '@tanstack/react-query';

import { putLockerRegister } from '../../api';
import { lockerQueryKey } from '../../config';

export const useRegisterLockerMutation = (opts?: { onSuccess?: () => void }) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (lockerId: string) => putLockerRegister(lockerId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: lockerQueryKey.all });
      opts?.onSuccess?.();
    },
  });
};
