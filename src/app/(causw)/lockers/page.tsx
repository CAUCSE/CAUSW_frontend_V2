'use client';

import { useQuery } from '@tanstack/react-query';

import { LockerInfoByFloorList, LockerListHeader } from '@/widgets/locker';

import { getMyLockerV2, useLockerLocationsQuery } from '@/entities/locker';

import { LoadingScreen } from '@/shared';

const LockerList = () => {
  const { data: lockerLocations, isLoading } = useLockerLocationsQuery();

  const { data: myLocker } = useQuery({
    queryKey: ['lockerV2', 'me'],
    queryFn: getMyLockerV2,
  });

  if (isLoading || !lockerLocations) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative top-3 left-4 w-[calc(100%-2rem)] md:top-14 md:left-14 md:w-[calc(100%-7rem)]">
      <LockerListHeader lockerLocations={lockerLocations} myLocker={myLocker} />
      <LockerInfoByFloorList lockerLocations={lockerLocations} />
    </div>
  );
};

export default LockerList;
