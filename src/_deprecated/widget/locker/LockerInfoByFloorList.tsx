import { LOCKER_CONSTANT } from "@/utils";
import { LockerInfoByFloor } from "@/_deprecated/entities";

interface LockerInfoByFloorListProps {
  lockerLocations: Locker.LockerLocationsResponseDto;
}

export const LockerInfoByFloorList = ({
  lockerLocations,
}: LockerInfoByFloorListProps) => {
  const { floor } = LOCKER_CONSTANT();

  return (
    <div className="flex w-full flex-col gap-4 space-y-4">
      {Object.keys(floor)
        .map((floorName) => {
          return lockerLocations.lockerLocations.find(
            (lockerLocation) => lockerLocation.name === floorName,
          );
        })
        .map((lockerLocation) => {
          if (!lockerLocation) {
            return <></>;
          }
          return (
            <LockerInfoByFloor
              lockerLocation={lockerLocation}
              key={lockerLocation.id}
            />
          );
        })}
    </div>
  );
};
