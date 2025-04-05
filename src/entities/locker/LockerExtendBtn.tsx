'use client';

import { useExtendLocker } from '@/shared';

interface LockerExtendBtnProps {
  isMobile: boolean;
  disable: boolean;
}

export const LockerExtendBtn = ({ isMobile, disable }: LockerExtendBtnProps) => {
  const { handleExtendLocker } = useExtendLocker();
  return (
    <button
      className={`${isMobile ? 'h-10 rounded-lg px-10 py-2' : 'h-14 w-1/3 min-w-[100px] rounded-3xl text-lg'} ${disable ? 'bg-[#BABABA] text-[#888888]' : 'bg-[#6BBEEC]'} font-semibold`}
      onClick={handleExtendLocker}
      disabled={disable}
    >
      연장하기
    </button>
  );
};
