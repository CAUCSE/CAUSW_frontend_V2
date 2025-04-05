'use client';

import { LockerExtendBtn, LockerRegisterBtn, LockerReturnBtn } from '@/entities';
import { useLockerSelectionStore } from '@/shared';

interface LockerMobileActionBtnProps {
  lockerPeriod: Locker.TLockerPeriod;
}

export const LockerMobileActionBtn = ({ lockerPeriod }: LockerMobileActionBtnProps) => {
  const clickedLockerStatus = useLockerSelectionStore(state => state.clickedLockerStatus);

  return (
    <div className="fixed bottom-24 md:hidden">
      {clickedLockerStatus === 'isActive' && (
        <LockerRegisterBtn isMobile disable={!(lockerPeriod === 'LOCKER_ACCESS')} />
      )}
      {clickedLockerStatus === 'isNotActive' && <LockerRegisterBtn isMobile disable />}
      {clickedLockerStatus === 'isMine' && (
        <div className="flex items-center gap-8">
          <LockerReturnBtn isMobile />
          <LockerExtendBtn isMobile disable={!(lockerPeriod === 'LOCKER_EXTEND')} />
        </div>
      )}
    </div>
  );
};
