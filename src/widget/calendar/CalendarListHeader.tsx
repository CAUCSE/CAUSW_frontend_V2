"use client";

import { CustomYearSelect, useCalendarStore } from "@/shared";

import AddIcon from "../../../public/icons/add_icon.svg";
import Link from "next/link";
import { useShallow } from "zustand/react/shallow";

export const CalendarListHeader = () => {
  const { calendarYear, setCalendarYear } = useCalendarStore(
    useShallow((state) => ({
      calendarYear: state.calendarYear,
      setCalendarYear: state.setCalendarYear,
    })),
  );

  return (
    <header className="my-4 flex w-full flex-col gap-4">
      <Link href=".." className="mb-7 flex items-center text-lg">
        <span className="icon-[weui--back-filled] mr-6 text-xl font-bold md:text-3xl"></span>
        이전
      </Link>
      <div className="flex items-center justify-between gap-4 md:justify-normal">
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
        initialValue={calendarYear}
        setSelectValue={setCalendarYear}
      />
    </header>
  );
};
