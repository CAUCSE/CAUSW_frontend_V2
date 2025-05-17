'use client';

import { LockerExtendBtn, LockerRegisterBtn, LockerReturnBtn } from '@/entities';
import { useLockerSelectionStore } from '@/shared';

interface LockerDesktopActionBtnProps {
  lockerPeriod: Locker.TLockerPeriod;
}

export const LockerDesktopActionBtn = ({ lockerPeriod }: LockerDesktopActionBtnProps) => {
  const clickedLockerStatus = useLockerSelectionStore((state) => state.clickedLockerStatus);

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="w-2/3 whitespace-pre-wrap break-keep text-center">
        <p className="text-sm text-[#888888]">
          신청 후 다른 사물함으로 재신청하는 경우, 원래 사물함은 자동으로 반납 처리 됩니다.
        </p>
      </div>
      {(!clickedLockerStatus || clickedLockerStatus === 'isActive') && (
        <LockerRegisterBtn isMobile={false} disable={!(lockerPeriod === 'LOCKER_ACCESS')} />
      )}
      {clickedLockerStatus === 'isNotActive' && <LockerRegisterBtn isMobile={false} disable />}
      {clickedLockerStatus === 'isMine' && (
        <div className="flex w-full justify-around gap-4">
          <LockerReturnBtn isMobile={false} />
          <LockerExtendBtn isMobile={false} disable={!(lockerPeriod === 'LOCKER_EXTEND')} />
        </div>
      )}
    </div>
  );
};
