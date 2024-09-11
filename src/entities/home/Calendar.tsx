"use client";

import { HomeRscService } from "@/shared";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CardBox } from "./card/CardBox";

export const Calendar = async () => {
  const [calendars, setCalendars] = useState<Home.GetCalendarsResponseDto>();
  const { getCalendars } = HomeRscService();

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const response = await getCalendars();
        setCalendars(response);
      } catch (e: any) {
        console.error(e.message);
      }
    };

    fetchCalendars();
  });

  const [selectedYearMonth, setSelectedYearMonth] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  const handlePrevMonth = () => {
    setSelectedYearMonth((prev) => {
      if (prev.month === 0) {
        return { year: prev.year - 1, month: 11 };
      }
      return { year: prev.year, month: prev.month - 1 };
    });
  };

  const handleNextMonth = () => {
    setSelectedYearMonth((prev) => {
      if (prev.month === 11) {
        return { year: prev.year + 1, month: 0 };
      }
      return { year: prev.year, month: prev.month + 1 };
    });
  };

  return (
    <CardBox className="flex h-full flex-col items-center gap-[25px] p-[30px]">
      <div className="flex h-[25px] w-full items-center justify-center gap-[40px]">
        <button>
          <i className="icon-[material-symbols--chevron-left] h-[25px] w-[25px] text-gray-400" />
        </button>
        <p className="w-full text-center text-[14px] text-[#4A5660]">
          September 2024
        </p>
        <button>
          <i className="icon-[material-symbols--chevron-right] h-[25px] w-[25px] text-gray-400" />
        </button>
      </div>
      <Image
        src={
          calendars
            ? (calendars.calendars.find(
                (c) =>
                  c.year === selectedYearMonth.year &&
                  c.month === selectedYearMonth.month,
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
