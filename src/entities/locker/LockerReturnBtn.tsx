'use client';

import { useReturnLocker } from '@/shared';

interface LockerReturnBtnProps {
  isMobile: boolean;
}

export const LockerReturnBtn = ({ isMobile }: LockerReturnBtnProps) => {
  const { handleReturnLocker } = useReturnLocker();
  return (
    <button
      className={`${isMobile ? 'h-10 rounded-lg px-10 py-2' : 'h-14 w-1/3 min-w-[100px] rounded-3xl text-lg'} bg-[#6BBEEC] font-semibold`}
      onClick={handleReturnLocker}
    >
      반납하기
    </button>
  );
};
