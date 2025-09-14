'use client';

import { LockerListHeader } from '@/widgets/locker';
import { LockerInfoByFloorList } from '@/widgets/locker';

import { useGetLockerLocations } from '@/entities/locker';

import { LoadingScreen } from '@/shared';

const LockerList = () => {
  const { data: lockerLocations, isLoading } = useGetLockerLocations();

  if (isLoading || !lockerLocations) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative top-3 left-4 w-[calc(100%-2rem)] md:top-14 md:left-14 md:w-[calc(100%-7rem)]">
      <LockerListHeader lockerLocations={lockerLocations} />
      <LockerInfoByFloorList lockerLocations={lockerLocations} />
    </div>
  );
};

export default LockerList;
