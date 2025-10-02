'use client';

import Link from 'next/link';

import { CeremonyListItem } from '@/widgets/ceremony';

import { useInfiniteScroll } from '@/shared';

interface AdminCeremonyListProps extends Ceremony.CeremonyListProps {
  context?: string; // 선택적 query string 추가
}

export const AdminCeremonyList = ({
  list,
  firstNavigation,
  navigation,
  state,
  loadMore,
  context,
}: AdminCeremonyListProps) => {
  const { targetRef } = useInfiniteScroll({
    intersectionCallback: ([entry]) => {
      if (entry.isIntersecting && loadMore) {
        loadMore();
      }
    },
  });

  return (
    <div className="mt-4 flex flex-col">
      {list.length > 0 ? (
        <>
          {list.map((element: Ceremony.CeremonyItem) => {
            const basePath =
              (firstNavigation
                ? firstNavigation.router
                : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  navigation?.find((el: any) => el.state === state)?.router) ??
              '';
            const href = `${basePath}/${element.id}${context ? `?context=${context}` : ''}`;
            return (
              <Link href={href} key={element.id}>
                <CeremonyListItem item={element} />
              </Link>
            );
          })}
          <div ref={targetRef} className="h-[1px]" />
        </>
      ) : (
        <div className="mt-10 text-center text-gray-500">
          신청된 경조사가 없습니다.
        </div>
      )}
    </div>
  );
};
