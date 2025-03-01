"use client";

import {
  LockerMobileActionBtn,
  LockerSelectionDesktopManual,
  LockerSelectionGrid,
  LockerSelectionHeader,
  LockerSelectionMobileManual,
} from "@/widget";

import { LoadingComponent } from "@/entities";
import { LockerService } from "@/shared";
import { useParams } from "next/navigation";

// TODO 사물함 신청 기간, 만료 기간에 따라 안내 문구 및 버튼 상태 변경하기

const LockerSelectionPage = () => {
  const params = useParams();
  const locationId = params.locationId as string;

  const { useGetLockerList } = LockerService();
  const { data: lockerList, isLoading } = useGetLockerList(locationId);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="relative left-4 top-3 w-[calc(100%-2rem)] md:left-14 md:top-14 md:w-[calc(100%-7rem)]">
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
