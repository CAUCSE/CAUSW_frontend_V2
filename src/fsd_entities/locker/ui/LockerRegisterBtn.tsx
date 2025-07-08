'use client';

import { useRegisterLocker } from '../model';

interface LockerRegisterBtnProps {
  isMobile: boolean;
  disable: boolean;
  onSuccess?: () => void;
}

export const LockerRegisterBtn = ({ isMobile, disable, onSuccess }: LockerRegisterBtnProps) => {
  const { handleRegisterLocker } = useRegisterLocker({ onSuccess });
  return (
    <button
      className={`${isMobile ? 'h-10 rounded-lg px-10 py-2' : 'h-14 w-2/3 rounded-3xl text-lg'} ${disable ? 'bg-[#BABABA]' : 'bg-[#6BBEEC]'} font-semibold`}
      onClick={handleRegisterLocker}
      disabled={disable}
    >
      신청하기
    </button>
  );
};
