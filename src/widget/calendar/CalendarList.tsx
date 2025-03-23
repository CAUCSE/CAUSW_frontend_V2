"use client";

import { CalendarCard, LoadingComponent } from "@/entities";
import { CalendarService, EmptyComponent, useCalendarStore } from "@/shared";

export const CalendarList = () => {
  const calendarYear = useCalendarStore((state) => state.calendarYear);
  const { useGetCalendarList } = CalendarService();
  const { data, isLoading } = useGetCalendarList({ year: calendarYear });
  const calendars = data?.calendars;
  if (isLoading) {
    return <LoadingComponent />;
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
              editDate={calendar.updatedAt}
            />
          ))}
        </div>
      )}
    </>
  );
};
