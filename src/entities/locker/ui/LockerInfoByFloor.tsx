import Link from 'next/link';

import { LOCKER_CONSTANT } from '@/shared';

interface LockerInfoByFloorProps {
  lockerLocation: Locker.LockerLocationResponseDto;
}

export const LockerInfoByFloor = ({ lockerLocation }: LockerInfoByFloorProps) => {
  const { floor } = LOCKER_CONSTANT();

  return (
    <Link href={`/lockers/${lockerLocation.id}`} key={lockerLocation.id}>
      <section className="flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-lg">
        <p className="text-lg md:text-2xl">{floor[lockerLocation.name]}</p>
        <div className="flex items-center">
          <div className="flex w-full">
            <div
              className="h-8 w-4 bg-[#76C6D1] md:h-11"
              style={{
                width: `${(lockerLocation.enableLockerCount / lockerLocation.totalLockerCount) * 100}%`,
              }}
            ></div>
            <div className="h-8 grow bg-[#D9D9D9] md:h-11"></div>
          </div>
          <div className="ml-4 flex-col flex-nowrap">
            <p className="text-sm text-nowrap md:text-base">잔여 {lockerLocation.enableLockerCount}개</p>
            <p className="text-sm text-nowrap md:text-base">전체 {lockerLocation.totalLockerCount}개</p>
          </div>
        </div>
      </section>
    </Link>
  );
};
