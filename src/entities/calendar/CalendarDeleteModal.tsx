"use client";

import { CalendarService, useCalendarStore } from "@/shared";
import React from "react";
import { createPortal } from "react-dom";
import { useShallow } from "zustand/react/shallow";

export const CalendarDeleteModal = () => {
  const { calendarId, calendarMonth, calendarYear, closeModal } =
    useCalendarStore(
      useShallow((state) => ({
        calendarId: state.calendarId,
        calendarYear: state.calendarYear,
        calendarMonth: state.calendarMonth,
        closeModal: state.closeModal,
      })),
    );
  const { useDeleteCalendar } = CalendarService();
  const { mutate } = useDeleteCalendar();
  const clickOutSide = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    closeModal();
  };

  const cancel = () => {
    closeModal();
  };

  const deleteCalendar = () => {
    mutate({ calendarId, calendarYear });
  };

  return createPortal(
    <div
      className="absolute z-10 h-screen w-screen bg-black bg-opacity-50"
      onClick={clickOutSide}
    >
      <div className="absolute left-1/2 top-1/2 flex min-w-72 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-4 rounded-lg bg-white p-8">
        <h1 className="text-xl">캘린더 삭제</h1>
        <p className="text-center text-red-500">
          {calendarYear}년 {calendarMonth}월 캘린더를 삭제하시겠습니까?
          <br />
          삭제하실 경우 다시 복구시킬 수 없습니다.
        </p>
        <div className="flex gap-4">
          <button
            className="rounded-lg bg-gray-300 px-8 py-2 hover:bg-gray-400"
            onClick={cancel}
          >
            취소
          </button>
          <button
            className="rounded-lg bg-red-500 px-8 py-2 text-white hover:bg-red-700"
            onClick={deleteCalendar}
          >
            삭제
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
