'use client';

import { useMemo } from 'react';

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';

import {
  getLockerLocationsV2,
  getLockerPeriodStatusV2,
  getMyLockerV2,
} from '@/entities/locker';

import { LoadingScreen } from '@/shared';

const LockerListRenewal = () => {
  const { data: locations, isLoading: isLocationsLoading } = useQuery({
    queryKey: ['lockerV2', 'locations'],
    queryFn: getLockerLocationsV2,
  });

  const { data: periodStatus } = useQuery({
    queryKey: ['lockerV2', 'period-status'],
    queryFn: getLockerPeriodStatusV2,
  });

  const { data: myLocker } = useQuery({
    queryKey: ['lockerV2', 'me'],
    queryFn: getMyLockerV2,
  });

  const isLoading = isLocationsLoading;

  const phaseMessage = useMemo(() => {
    if (!periodStatus || periodStatus.phase === 'CLOSED') return '';
    switch (periodStatus.phase) {
      case 'APPLY':
        return '현재 상태: 사물함 신청 기간';
      case 'EXTEND':
        return '현재 상태: 사물함 연장 기간';
      default:
        return '현재 상태: 사물함 신청/연장 기간이 아닙니다.';
    }
  }, [periodStatus]);

  const periodRangeText = useMemo(() => {
    if (!periodStatus || periodStatus.phase === 'CLOSED') return '';

    const format = (iso: string) => {
      const d = new Date(iso);
      const pad = (n: number) => String(n).padStart(2, '0');
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
        d.getDate(),
      )} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    };

    return `${format(periodStatus.startAt)} ~ ${format(periodStatus.endAt)}`;
  }, [periodStatus]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!locations) {
    return (
      <div className="flex h-full w-full items-center justify-center text-sm text-[#555555]">
        사물함 위치 정보를 불러오지 못했습니다.
      </div>
    );
  }

  const { summary, floors } = locations;

  const currentLockerText =
    myLocker && myLocker.hasLocker ? (myLocker.displayName ?? '없음') : '없음';

  return (
    <div className="relative top-3 left-4 w-[calc(100%-2rem)] md:top-14 md:left-14 md:w-[calc(100%-7rem)]">
      <header>
        <div className="flex items-start justify-between">
          <Link href="/home" className="mb-7 flex items-center text-lg">
            <span className="icon-[weui--back-filled] mr-6 text-xl font-bold md:text-3xl"></span>
            이전
          </Link>
          <div className="hidden items-center gap-4 md:flex">
            <p>현재 사물함</p>
            <div className="ml-2 rounded-2xl border border-black px-8 py-1">
              <p>{currentLockerText}</p>
            </div>
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-normal text-nowrap text-[#8B8B8B]">
            잔여 {summary.availableCount}개 / 전체 {summary.totalCount}개
          </p>
          <div className="flex items-center gap-4 text-nowrap md:hidden">
            <p className="">현재 사물함</p>
            <div className="ml-2 rounded-2xl border border-black px-4 py-1 md:px-8">
              <p className="text-sm md:text-base">{currentLockerText}</p>
            </div>
          </div>
        </div>

        {phaseMessage && (
          <p className="mb-1 text-sm text-[#555555]">{phaseMessage}</p>
        )}
        {periodRangeText && (
          <p className="mb-4 text-xs text-[#888888]">
            신청/연장 가능 기간: {periodRangeText}
          </p>
        )}
      </header>

      <div className="flex w-full flex-col gap-4">
        {floors.map((floor) => (
          <Link
            href={`/lockers/renewal/${floor.locationId}`}
            key={floor.locationId}
          >
            <section className="flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-lg">
              <p className="text-lg md:text-2xl">{floor.floorName}</p>
              <div className="flex items-center">
                <div className="flex w-full">
                  <div
                    className="h-8 w-4 bg-[#76C6D1] md:h-11"
                    style={{
                      width: `${
                        (floor.availableCount / floor.totalCount) * 100
                      }%`,
                    }}
                  ></div>
                  <div className="h-8 grow bg-[#D9D9D9] md:h-11"></div>
                </div>
                <div className="ml-4 flex-col flex-nowrap">
                  <p className="text-sm text-nowrap md:text-base">
                    잔여 {floor.availableCount}개
                  </p>
                  <p className="text-sm text-nowrap md:text-base">
                    전체 {floor.totalCount}개
                  </p>
                </div>
              </div>
            </section>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LockerListRenewal;
