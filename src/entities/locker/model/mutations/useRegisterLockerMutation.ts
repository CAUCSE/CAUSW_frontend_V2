import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { putLockerRegister } from '../../api';
import { lockerQueryKey } from '../../config';

export const useRegisterLockerMutation = (opts?: {
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (lockerId: string) => putLockerRegister(lockerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lockerQueryKey.all });

      // 사물함 위치 정보 추후 추가 예정
      // const { floor } = LOCKER_CONSTANT();
      // const myLocker = res.data.myLocker;
      // const location = myLocker
      //   ? `${floor[myLocker.lockerNumber.split(' ')[0]]} ${myLocker.lockerNumber.split(' ')[1]}번`
      //   : '없음';

      toast.success(`사물함 등록이 완료되었습니다. 위치: ${location}`);
      opts?.onSuccess?.();
    },

    onError: () => {
      toast.error('사물함 등록에 실패했습니다.');
    },
  });
};
