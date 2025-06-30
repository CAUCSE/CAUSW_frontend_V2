'use client';

import { useState } from 'react';

import {
  LockerExtendBtn,
  LockerRegisterBtn,
  LockerReturnBtn,
  RegistSuccessModal,
  useLockerSelectionStore,
} from '@/fsd_entities/locker';

interface LockerMobileActionBtnProps {
  lockerPeriod: Locker.TLockerPeriod;
}

export const LockerMobileActionBtn = ({ lockerPeriod }: LockerMobileActionBtnProps) => {
  const clickedLockerStatus = useLockerSelectionStore((state) => state.clickedLockerStatus);
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      {openModal && <RegistSuccessModal onClose={() => setOpenModal(false)} />}
      <div className="fixed bottom-24 md:hidden">
        {clickedLockerStatus === 'isActive' && (
          <LockerRegisterBtn
            isMobile
            disable={!(lockerPeriod === 'LOCKER_ACCESS')}
            onSuccess={() => setOpenModal(true)}
          />
        )}
        {clickedLockerStatus === 'isNotActive' && <LockerRegisterBtn isMobile disable />}
        {clickedLockerStatus === 'isMine' && (
          <div className="flex items-center gap-8">
            <LockerReturnBtn isMobile />
            <LockerExtendBtn isMobile disable={!(lockerPeriod === 'LOCKER_EXTEND')} />
          </div>
        )}
      </div>
    </>
  );
};
