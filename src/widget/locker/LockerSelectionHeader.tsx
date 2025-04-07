import Link from 'next/link';

import { LOCKER_CONSTANT } from '@/utils';

interface LockerSelectionHeaderProps {
  lockerList: Locker.LockersResponseDto;
}

export const LockerSelectionHeader = ({ lockerList }: LockerSelectionHeaderProps) => {
  const { floor } = LOCKER_CONSTANT();

  let availableLockerCount = 0;
  lockerList.lockerList.forEach(locker => {
    if (locker.isActive) {
      availableLockerCount++;
    }
  });
  const totalLockerCount = lockerList.lockerList.length;

  return (
    <header>
      <Link href="/lockers" className="mb-7 flex items-center text-lg">
        <span className="icon-[weui--back-filled] mr-6 text-xl font-bold md:text-3xl"></span>
        이전
      </Link>
      <div className="mb-4 flex items-center gap-4">
        <h1 className="text-2xl">{floor[lockerList.locationName]}</h1>
        <p className="text-[#8B8B8B]">
          잔여 {availableLockerCount}개 / 전체 {totalLockerCount}개
        </p>
      </div>
    </header>
  );
};
