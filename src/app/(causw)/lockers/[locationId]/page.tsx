'use client';

import { useMemo } from 'react';

import { useParams } from 'next/navigation';

import {
  LockerMobileActionBtn,
  LockerSelectionDesktopManual,
  LockerSelectionGrid,
  LockerSelectionHeader,
  LockerSelectionMobileManual,
} from '@/fsd_widgets/locker';

import { useGetLockerList } from '@/entities/locker';

import { LoadingScreen } from '@/shared';

const LockerSelectionPage = () => {
  const params = useParams();
  const locationId = params.locationId as string;

  const { data: lockerList, isLoading } = useGetLockerList(locationId);

  const myLocker = useMemo(() => lockerList?.lockerList.find((l) => l.isMine) ?? null, [lockerList]);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="relative top-3 left-4 w-[calc(100%-2rem)] md:top-14 md:left-14 md:w-[calc(100%-7rem)]">
      <LockerSelectionHeader lockerList={lockerList!} />
      <div className="flex h-full flex-col items-center gap-4 md:flex-row md:justify-between">
        <LockerSelectionMobileManual
          lockerPeriod={lockerList!.lockerPeriod}
          hasMyLocker={!!myLocker}
          myLockerExpireAt={myLocker?.expireAt ?? null}
        />
        <LockerSelectionGrid lockerList={lockerList!} />
        <LockerSelectionDesktopManual
          lockerPeriod={lockerList!.lockerPeriod}
          hasMyLocker={!!myLocker}
          myLockerExpireAt={myLocker?.expireAt ?? null}
        />
        <LockerMobileActionBtn lockerPeriod={lockerList!.lockerPeriod} />
      </div>
    </div>
  );
};

export default LockerSelectionPage;
