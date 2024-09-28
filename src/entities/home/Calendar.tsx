"use client";

import { HomeRscService } from "@/shared";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CardBox } from "./card/CardBox";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const Calendar = () => {
  const [calendars, setCalendars] = useState<Home.GetCalendarsResponseDto>();
  const { getCalendars } = HomeRscService();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const response = await getCalendars(selectedYear);
        setCalendars(response);
      } catch (e: any) {
        console.error(e.message);
      }
    };

    fetchCalendars();
  }, [selectedYear, getCalendars]);

  const handlePrevMonth = () => {
    setSelectedMonth((prev) => {
      if (prev === 0) {
        setSelectedYear(selectedYear - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setSelectedMonth((prev) => {
      if (prev === 11) {
        setSelectedYear(selectedYear + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  return (
    <CardBox className="flex h-full flex-col items-center gap-[25px] p-[30px]">
      <div className="flex h-[25px] w-full items-center justify-center gap-[40px]">
        <button className="cursor-pointer" onClick={handlePrevMonth}>
          <i className="icon-[material-symbols--chevron-left] h-[25px] w-[25px] text-gray-400" />
        </button>
        <p className="w-[150px] text-center text-[14px] text-[#4A5660]">
          {MONTHS[selectedMonth]}
          <br />
          {selectedYear}
        </p>
        <button className="cursor-pointer" onClick={handleNextMonth}>
          <i className="icon-[material-symbols--chevron-right] h-[25px] w-[25px] text-gray-400" />
        </button>
      </div>
      <Image
        src={
          calendars
            ? (calendars.calendars.find(
                (c) => c.year === selectedYear && c.month === selectedMonth,
              )?.image as string)
            : "/images/calendar-dummy.png"
        }
        width={391}
        height={383}
        className="h-full w-full border-b-[1px] object-cover"
        alt="캘린더"
      />
      <hr className="w-full border-[1px] border-[#E0E0E0]" />
      <Link
        href="delivered"
        className="text-[24px] underline underline-offset-[5px]"
      >
        딜리버드 보러 가기
      </Link>
    </CardBox>
  );
};
