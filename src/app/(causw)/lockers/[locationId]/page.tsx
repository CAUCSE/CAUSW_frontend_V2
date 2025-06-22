'use client';

import { useParams } from 'next/navigation';

import { LockerSelectionHeader } from '@/fsd_widgets/locker';

import { LoadingScreen } from '@/fsd_shared';
import { LockerService } from '@/shared';
import {
  LockerMobileActionBtn,
  LockerSelectionDesktopManual,
  LockerSelectionGrid,
  LockerSelectionMobileManual,
} from '@/widget';

// TODO 사물함 신청 기간, 만료 기간에 따라 안내 문구 및 버튼 상태 변경하기

const LockerSelectionPage = () => {
  const params = useParams();
  const locationId = params.locationId as string;

  const { useGetLockerList } = LockerService();
  const { data: lockerList, isLoading } = useGetLockerList(locationId);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative top-3 left-4 w-[calc(100%-2rem)] md:top-14 md:left-14 md:w-[calc(100%-7rem)]">
      <LockerSelectionHeader lockerList={lockerList!} />
      <div className="flex h-full flex-col items-center gap-4 md:flex-row md:justify-between">
        <LockerSelectionMobileManual lockerPeriod={lockerList!.lockerPeriod} />
        <LockerSelectionGrid lockerList={lockerList!} />
        <LockerSelectionDesktopManual lockerPeriod={lockerList!.lockerPeriod} />
        <LockerMobileActionBtn lockerPeriod={lockerList!.lockerPeriod} />
      </div>
    </div>
  );
};

export default LockerSelectionPage;
