'use client';

import {
  LockerExtendBtn,
  LockerRegisterBtn,
  LockerReturnBtn,
  useLockerSelectionStore,
  useLockerSuccessToast,
} from '@/entities/locker';

interface LockerMobileActionBtnProps {
  lockerPeriod: Locker.TLockerPeriod;
}

export const LockerMobileActionBtn = ({ lockerPeriod }: LockerMobileActionBtnProps) => {
  const clickedLockerStatus = useLockerSelectionStore((state) => state.clickedLockerStatus);
  const successToast = useLockerSuccessToast();

  return (
    <div className="fixed bottom-24 md:hidden">
      {clickedLockerStatus === 'isActive' && (
        <LockerRegisterBtn isMobile disable={!(lockerPeriod === 'LOCKER_ACCESS')} onSuccess={successToast} />
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
