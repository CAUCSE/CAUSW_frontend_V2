'use client';

import { LoadingComponent } from '@/entities';
import { LockerService } from '@/shared';
import { LockerInfoByFloorList, LockerListHeader } from '@/widget';

const LockerList = () => {
  const { useGetLockerLocations } = LockerService();
  const { data: lockerLocations, isLoading } = useGetLockerLocations();

  if (isLoading || !lockerLocations) {
    return <LoadingComponent />;
  }

  return (
    <div className="relative left-4 top-3 w-[calc(100%-2rem)] md:left-14 md:top-14 md:w-[calc(100%-7rem)]">
      <LockerListHeader lockerLocations={lockerLocations} />
      <LockerInfoByFloorList lockerLocations={lockerLocations} />
    </div>
  );
};

export default LockerList;
