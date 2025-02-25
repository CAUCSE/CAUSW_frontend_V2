import Link from "next/link";

interface LockerListHeaderProps {
  lockerLocations: Locker.LockerLocationsResponseDto;
}

export const LockerListHeader = ({
  lockerLocations,
}: LockerListHeaderProps) => {
  let availableLockerCount = 0,
    totalLockerCount = 0;
  lockerLocations.lockerLocations.forEach((lockerLocation) => {
    availableLockerCount += lockerLocation.enableLockerCount;
    totalLockerCount += lockerLocation.totalLockerCount;
  });

  return (
    <header>
      <div className="flex items-start justify-between">
        <Link href="/home" className="mb-7 flex items-center text-lg">
          <span className="icon-[weui--back-filled] mr-6 text-xl font-bold md:text-3xl"></span>
          이전
        </Link>
        <div className="hidden items-center gap-4 md:flex">
          <p>현재 사물함</p>
          <div className="ml-2 rounded-2xl border border-black px-8 py-1">
            {/* TODO 사물함 층 수도 표시하기 */}
            <p>
              {lockerLocations.myLocker
                ? `${lockerLocations.myLocker.lockerNumber}번`
                : "없음"}
            </p>
          </div>
        </div>
      </div>
      <div className="mb-4 flex-col sm:flex">
        <p className="mb-2 text-nowrap font-normal text-[#8B8B8B] md:mb-0">
          잔여 {availableLockerCount}개 / 전체 {totalLockerCount}개
        </p>
        <div className="flex items-center gap-4 text-nowrap md:hidden">
          <p className="">현재 사물함</p>
          <div className="ml-2 rounded-2xl border border-black px-4 py-1 md:px-8">
            {/* TODO 사물함 층 수도 표시하기 */}
            <p className="text-sm md:text-base">
              {lockerLocations.myLocker
                ? `${lockerLocations.myLocker.lockerNumber}번`
                : "없음"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
