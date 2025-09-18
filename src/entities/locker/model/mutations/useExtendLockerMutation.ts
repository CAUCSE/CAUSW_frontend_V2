import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { putLockerExtenstion } from '../../api';
import { lockerQueryKey } from '../../config';

export const useExtendLockerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (lockerId: string) => putLockerExtenstion(lockerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lockerQueryKey.all });
      toast.success('사물함 연장이 완료되었습니다.');
    },
    onError: () => {
      toast.error('사물함 연장에 실패했습니다.');
    },
  });
};
