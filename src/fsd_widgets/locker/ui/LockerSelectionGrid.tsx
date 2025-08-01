import { LockerSelect } from '@/fsd_entities/locker';

interface LockerSelectionGridProps {
  lockerList: Locker.LockersResponseDto;
}

export const LockerSelectionGrid = ({ lockerList }: LockerSelectionGridProps) => {
  return (
    <div className="grid h-[450px] shrink-0 grid-cols-4 gap-2 overflow-y-auto p-1 pr-2 sm:h-[600px] sm:grid-cols-5 md:gap-4 xl:h-[800px]">
      {lockerList.lockerList.map((locker) => {
        return <LockerSelect locker={locker} key={locker.id} />;
      })}
    </div>
  );
};
