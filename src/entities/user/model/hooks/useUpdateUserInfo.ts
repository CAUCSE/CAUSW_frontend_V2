'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateInfo } from '../../api/put';
import { userQueryKey } from '../../config/queryKeys/userQueryKey';
import { parseErrorMessage } from '@/fsd_shared';

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateInfo,
    onSuccess: () => {
      toast.success('변경 사항이 저장되었습니다.');
      queryClient.invalidateQueries({ queryKey: userQueryKey.all });
    },
    onError: (error: Error.ApiErrorResponse) => {
      toast.error(parseErrorMessage(error, '변경 사항 저장에 실패했습니다.'));
    },
  });
};