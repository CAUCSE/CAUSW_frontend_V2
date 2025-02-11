"use client";
// 에러 수정 완료

import Link from "next/link";
import { LoadingComponent } from "@/entities";
import { LockerService } from "@/shared";

const floor = {
  "Second Floor": "2층",
  "Third Floor": "3층",
  "Fourth Floor": "4층",
};

const LockerList = () => {
  const { useGetLockerLocations } = LockerService();
  const { data: lockers, isLoading, isError } = useGetLockerLocations();

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        사물함 정보를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  console.log(lockers);
  let availableLockerCount = 0,
    totalLockerCount = 0;
  lockers?.lockerLocations.forEach((lockerLocation) => {
    availableLockerCount += lockerLocation.enableLockerCount;
    totalLockerCount += lockerLocation.totalLockerCount;
  });

  return (
    <div className="relative left-4 top-3 w-[calc(100%-2rem)] md:left-14 md:top-14 md:w-[calc(100%-7rem)]">
      <div className="flex items-start justify-between">
        <Link href="/home" className="mb-7 flex items-center text-lg">
          <span className="icon-[weui--back-filled] mr-6 text-3xl font-bold"></span>
          이전
        </Link>
        <div className="flex items-center gap-4">
          <p>현재 사물함</p>
          <div className="ml-2 rounded-2xl border border-black px-8 py-1">
            {/* TODO 사물함 층 수도 표시하기 */}
            <p>
              {lockers!.myLocker
                ? `${lockers?.myLocker.lockerNumber}번`
                : "없음"}
            </p>
          </div>
        </div>
      </div>
      <p className="font-normal text-[#8B8B8B]">
        잔여 {availableLockerCount}개 / 전체 {totalLockerCount}개
      </p>
      <div className="flex w-full max-w-md flex-col gap-2 space-y-4">
        {/* {lockers.map((lockerFloor) => (
          <Link
            key={lockerFloor.id}
            href={`/lockers/${encodeURIComponent(lockerFloor.name)}`}
          >
            <div className="cursor-pointer rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">{lockerFloor.name}</h2>
              <div className="mt-2 h-2.5 w-full rounded-full bg-gray-300">
                <div
                  className="h-2.5 rounded-full bg-blue-600"
                  style={{
                    width: `${(lockerFloor.available / lockerFloor.total) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="mt-2 flex justify-between">
                <span>{`잔여 ${lockerFloor.available}`}</span>
                <span>{`전체 ${lockerFloor.total}`}</span>
              </div>
            </div>
          </Link>
        ))} */}
        {Object.keys(floor)
          .map((floorName) => {
            return lockers?.lockerLocations.find(
              (lockerLocation) => lockerLocation.name === floorName,
            );
          })
          .map((lockerLocation) => {
            return (
              <Link
                href={`/lockers/${lockerLocation?.id}`}
                key={lockerLocation?.id}
              >
                <div>{floor[lockerLocation?.name!]}</div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default LockerList;
