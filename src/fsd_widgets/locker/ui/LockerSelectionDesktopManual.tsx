'use client';

import { LockerDesktopActionBtn } from './LockerDesktopActionBtn';

interface LockerSelectionDesktopManualProps {
  lockerPeriod: Locker.TLockerPeriod;
}

export const LockerSelectionDesktopManual = ({ lockerPeriod }: LockerSelectionDesktopManualProps) => {
  const lockerExample = [
    {
      color: 'bg-[#D9D9D9]',
      content: '선택 불가',
    },
    {
      color: 'bg-white border border-[#BABABA]',
      content: '선택 가능',
    },
    {
      color: 'bg-[#76C6D1]',
      content: '내 사물함',
    },
  ];

  let lockerPeriodMessage = '사물함 신청 기간이 아닙니다.';
  if (lockerPeriod === 'LOCKER_ACCESS') {
    lockerPeriodMessage = '사물함 신청 기간입니다.';
  } else if (lockerPeriod === 'LOCKER_EXTEND') {
    lockerPeriodMessage = '사물함 연장 기간입니다.';
  }

  return (
    <div className="hidden h-[600px] flex-col items-center justify-between rounded-2xl border border-[#BABABA] bg-white px-4 py-6 md:flex xl:h-[780px]">
      <div className="flex w-full flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-2xl font-bold">사물함을 선택해주세요!</h1>
          <p className={`text-xl ${lockerPeriod === 'NULL' && 'text-red-500'}`}>{lockerPeriodMessage}</p>
        </div>
        <div className="ml-6 flex w-full flex-col items-start gap-3">
          {lockerExample.map((example, idx) => {
            return (
              <div className="flex items-center gap-2" key={idx}>
                <div className={`h-10 w-10 ${example.color}`}></div>
                <p> : {example.content}</p>
              </div>
            );
          })}
        </div>
      </div>
      <LockerDesktopActionBtn lockerPeriod={lockerPeriod} />
    </div>
  );
};
