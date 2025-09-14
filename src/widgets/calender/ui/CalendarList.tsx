'use client';

import { useShallow } from 'zustand/react/shallow';

import { CalendarCard, useCalendarStore, useGetCalendarList } from '@/entities/calender';
import { EmptyComponent, LoadingComponent } from '@/shared';
import { CalendarDeleteModal } from './CalendarDeleteModal';

export const CalendarList = () => {
  const { calendarYear, isDeleteModalOpen } = useCalendarStore(
    useShallow((state) => ({
      calendarYear: state.calendarYear,
      isDeleteModalOpen: state.isDeleteModalOpen,
    })),
  );
  const { data, isLoading } = useGetCalendarList({ year: calendarYear });
  const calendars = data?.calendars;
  if (isLoading) {
    return <LoadingComponent variant='full-opacity' />;
  }
  return (
    <>
      {calendars?.length === 0 ? (
        <EmptyComponent message="등록된 캘린더가 없습니다." />
      ) : (
        <div className="grid w-full grid-cols-1 place-items-center gap-x-4 gap-y-8 overflow-y-auto px-2 pb-4 sm:grid-cols-2 lg:grid-cols-3">
          {calendars!.map((calendar) => (
            <CalendarCard
              key={calendar.id}
              id={calendar.id}
              imgSrc={calendar.image}
              year={calendar.year}
              month={calendar.month}
            />
          ))}
        </div>
      )}
      {isDeleteModalOpen && <CalendarDeleteModal />}
    </>
  );
};
