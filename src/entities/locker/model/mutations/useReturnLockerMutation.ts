import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { putLockerReturn } from '../../api';
import { lockerQueryKey } from '../../config';

export const useReturnLockerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (lockerId: string) => putLockerReturn(lockerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lockerQueryKey.all });
      toast.success('사물함 반납이 완료되었습니다.');
    },
    onError: () => {
      toast.error('사물함 반납에 실패했습니다.');
    },
  });
};
