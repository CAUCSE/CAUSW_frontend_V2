'use client';

import { useState } from 'react';

import {
  LockerExtendBtn,
  LockerRegisterBtn,
  LockerReturnBtn,
  RegistSuccessModal,
  useLockerSelectionStore,
} from '@/fsd_entities/locker';

interface LockerDesktopActionBtnProps {
  lockerPeriod: Locker.TLockerPeriod;
}

export const LockerDesktopActionBtn = ({ lockerPeriod }: LockerDesktopActionBtnProps) => {
  const clickedLockerStatus = useLockerSelectionStore((state) => state.clickedLockerStatus);
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      {openModal && <RegistSuccessModal onClose={() => setOpenModal(false)} />}
      <div className="flex w-full flex-col items-center gap-8">
        {/* 문구 재생성 후, md:w-lg 삭제 */}
        <div className="w-2/3 text-center break-keep whitespace-pre-wrap md:w-lg">
          <p className="text-sm text-[#888888]">
            {/* 신청 후 다른 사물함으로 재신청하는 경우, 원래 사물함은 자동으로 반납 처리 됩니다. */}
          </p>
        </div>
        {(!clickedLockerStatus || clickedLockerStatus === 'isActive') && (
          <LockerRegisterBtn
            isMobile={false}
            disable={!(lockerPeriod === 'LOCKER_ACCESS')}
            onSuccess={() => setOpenModal(true)}
          />
        )}
        {clickedLockerStatus === 'isNotActive' && <LockerRegisterBtn isMobile={false} disable />}
        {clickedLockerStatus === 'isMine' && (
          <div className="flex w-full justify-around gap-4">
            <LockerReturnBtn isMobile={false} />
            <LockerExtendBtn isMobile={false} disable={!(lockerPeriod === 'LOCKER_EXTEND')} />
          </div>
        )}
      </div>
    </>
  );
};
