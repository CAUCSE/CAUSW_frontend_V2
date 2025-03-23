"use client";

import { CalendarDeleteModal } from "@/entities";
import { useCalendarStore } from "@/shared";

import { CalendarList, CalendarListHeader } from "@/widget";

const CalendarSettingPage = () => {
  const isModalOpen = useCalendarStore((state) => state.isModalOpen);

  return (
    <>
      <div className="flex h-full w-full flex-col lg:p-8">
        <CalendarListHeader />
        <CalendarList />
      </div>
      {isModalOpen && <CalendarDeleteModal />}
    </>
  );
};

export default CalendarSettingPage;
