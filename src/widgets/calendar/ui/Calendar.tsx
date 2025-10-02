'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { getCalendars } from '@/entities/home';

import { CardBox } from '@/shared/ui/CardBox';

import { MONTHS } from '../config';

interface CalendarProps {
  deliveredId: string | undefined;
}

export const Calendar = ({ deliveredId }: CalendarProps) => {
  const [calendars, setCalendars] = useState<Home.Calendar[]>();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    const loadCalendars = async () => {
      try {
        const response = (await getCalendars(selectedYear)).calendars;
        setCalendars(response);
      } catch (e: any) {}
    };

    loadCalendars();
  }, [selectedYear]);

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
    <CardBox className="flex h-full w-full flex-col items-center justify-center gap-[25px] p-[30px]">
      <div className="flex h-[25px] w-full items-center justify-center gap-[40px]">
        <button onClick={handlePrevMonth}>
          <i className="icon-[material-symbols--chevron-left] h-[25px] w-[25px] text-gray-400" />
        </button>
        <p className="text-center text-[14px] text-[#4A5660] lg:w-[150px]">
          {MONTHS[selectedMonth]}
          <br />
          {selectedYear}
        </p>
        <button onClick={handleNextMonth}>
          <i className="icon-[material-symbols--chevron-right] h-[25px] w-[25px] text-gray-400" />
        </button>
      </div>
      {/* <Image
        src={
          calendars
            ? (calendars.find(
                (c) => c.year === selectedYear && c.month === selectedMonth,
              )?.image as string)
            : "/images/calendar-dummy.png"
        }
        width={2070}
        height={2070}
        className="h-full w-full border-b object-cover"
        alt="캘린더"
      /> */}
      <div
        className="h-2/3 w-full bg-contain bg-cover bg-center"
        style={{
          backgroundImage: `url(${
            calendars
              ? (calendars.find((c) => c.year === selectedYear && c.month === selectedMonth + 1)?.image as string)
                ? (calendars.find((c) => c.year === selectedYear && c.month === selectedMonth + 1)?.image as string)
                : '/images/puang-proud.png'
              : '/images/puang-proud.png'
          })`,
        }}
      ></div>
      <hr className="w-full border border-[#E0E0E0]" />
      <Link
        // TODO : href 연결
        href={`/board/${deliveredId}`}
        className="text-[24px] underline underline-offset-[5px]"
      >
        딜리버드 보러 가기
      </Link>
    </CardBox>
  );
};
