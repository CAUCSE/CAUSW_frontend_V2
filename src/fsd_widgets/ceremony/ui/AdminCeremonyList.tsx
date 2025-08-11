import Link from 'next/link';

import { useInfiniteScroll } from '@/fsd_shared';

export const AdminCeremonyList = ({
  list,
  firstNavigation,
  navigation,
  state,
  loadMore,
}: Ceremony.CeremonyListProps) => {
  const { targetRef } = useInfiniteScroll({
    intersectionCallback: ([entry]) => {
      if (entry.isIntersecting && loadMore) {
        loadMore();
      }
    },
  });

  return (
    <div className="mt-6 ml-2 flex flex-col">
      {list.length > 0 ? (
        <>
          {list.map((element: Ceremony.CeremonyItem) => (
            <Link
              href={
                (firstNavigation ? firstNavigation.router : navigation?.find((el: any) => el.state === state)?.router) +
                '/' +
                element.id
              }
              className="mb-3 text-lg"
              key={element.id}
            >
              {element.writer} - {element.category}
            </Link>
          ))}
          <div ref={targetRef} className="h-[1px]" />
        </>
      ) : (
        <div>신청된 경조사가 없습니다.</div>
      )}
    </div>
  );
};
