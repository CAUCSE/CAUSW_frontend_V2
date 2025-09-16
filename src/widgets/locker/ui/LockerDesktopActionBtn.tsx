'use client';

import { LockerExtendBtn, LockerRegisterBtn, LockerReturnBtn, useLockerSelectionStore } from '@/entities/locker';
import { useLockerSuccessToast } from '@/entities/locker';

interface LockerDesktopActionBtnProps {
  lockerPeriod: Locker.TLockerPeriod;
}

export const LockerDesktopActionBtn = ({ lockerPeriod }: LockerDesktopActionBtnProps) => {
  const clickedLockerStatus = useLockerSelectionStore((state) => state.clickedLockerStatus);
  const successToast = useLockerSuccessToast();

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="w-2/3 text-center break-keep whitespace-pre-wrap">
        <p className="text-sm text-[#888888]"></p>
      </div>

      {(!clickedLockerStatus || clickedLockerStatus === 'isActive') && (
        <LockerRegisterBtn isMobile={false} disable={!(lockerPeriod === 'LOCKER_ACCESS')} onSuccess={successToast} />
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
