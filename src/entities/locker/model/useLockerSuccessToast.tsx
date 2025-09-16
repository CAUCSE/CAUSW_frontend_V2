import { toast } from 'react-hot-toast';

import { LOCKER_CONSTANT } from '@/shared';

import { useGetLockerLocations } from '../api';

export const useLockerSuccessToast = () => {
  const { data } = useGetLockerLocations();
  const { floor } = LOCKER_CONSTANT();

  return () => {
    const location = data?.myLocker
      ? `${floor[data?.myLocker.lockerNumber.split(' ')[0]]} ${data?.myLocker.lockerNumber.split(' ')[1]}번`
      : '없음';

    toast.success(`선택하신 사물함이 신청 완료되었습니다.\n`, {
      duration: 5000,
      style: {
        whiteSpace: 'pre-line',
        textAlign: 'center',
      },
    });
  };
};
