"use client";

import { CalendarCard, LoadingComponent } from "@/entities";
import { CalendarService, CustomYearSelect, EmptyComponent } from "@/shared";

import AddIcon from "../../../../../../public/icons/add_icon.svg";
import Link from "next/link";
import { useState } from "react";

const CalendarSettingPage = () => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  const { useGetCalendarList } = CalendarService();
  const { data, isLoading } = useGetCalendarList({ year: selectedYear });
  const calendars = data?.calendars;
  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="flex h-full w-full flex-col lg:p-8">
      <header className="my-4 flex w-full flex-col gap-4">
        <Link href=".." className="mb-7 flex items-center text-lg">
          <span className="icon-[weui--back-filled] mr-6 text-xl font-bold md:text-3xl"></span>
          이전
        </Link>
        <div className="flex items-center gap-4">
          <p className="text-xl font-medium lg:text-3xl">캘린더 관리</p>
          <button className="flex h-6 w-6 items-center justify-center rounded-full border border-[#007AFF] bg-[#007AFF] text-white hover:bg-white hover:text-[#007AFF]">
            <Link
              href="./calendar/new"
              className="flex items-center justify-center"
            >
              <AddIcon />
            </Link>
          </button>
        </div>
        <CustomYearSelect
          initialValue={selectedYear}
          setSelectValue={setSelectedYear}
        />
      </header>

      {calendars?.length === 0 ? (
        <EmptyComponent message="등록된 캘린더가 없습니다." />
      ) : (
        <div className="grid w-full grid-cols-1 place-items-center gap-x-4 gap-y-8 overflow-y-auto px-2 pb-4 sm:grid-cols-2 lg:grid-cols-3">
          {calendars!.map(({ image, year, month, updatedAt }) => (
            <CalendarCard
              key={year + month}
              imgSrc={image}
              year={year}
              month={month}
              editDate={updatedAt}
            />
          ))}
        </div>
      )}
      {/* {events && <p>이벤트 목록</p>} */}
    </div>
  );
};

export default CalendarSettingPage;
