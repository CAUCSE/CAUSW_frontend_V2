interface LockerSelectionMobileManualProps {
  lockerPeriod: Locker.TLockerPeriod;
}

export const LockerSelectionMobileManual = ({ lockerPeriod }: LockerSelectionMobileManualProps) => {
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
    <div className="flex w-full flex-col items-center gap-6 md:hidden">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">사물함을 선택해주세요!</h1>
        <p className={`text-xl ${lockerPeriod === 'NULL' && 'text-red-500'}`}>{lockerPeriodMessage}</p>
      </div>
      <div className="flex w-full flex-col gap-2">
        <hr className="w-full border border-[#BABABA]" />
        <div className="flex items-center gap-2">
          {lockerExample.map((example, idx) => {
            return (
              <div key={idx} className="flex items-center gap-2">
                <div className={`h-4 w-4 ${example.color} sm:h-6 sm:w-6`}></div>
                <p className="text-nowrap text-sm">: {example.content}</p>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end text-end">
          <div className="w-2/3">
            <p className="text-sm text-[#888888]">
              신청 후 다른 사물함으로 재신청하는 경우, 원래 사물함은 자동으로 반납 처리 됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
