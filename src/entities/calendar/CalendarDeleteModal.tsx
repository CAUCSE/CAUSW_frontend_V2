"use client";

import { createPortal } from "react-dom";
import { useDeleteCalendarModal } from "@/shared";

// TODO: focus 스트랩 적용, 재사용 가능한 모달 컴포넌트로 변경
export const CalendarDeleteModal = () => {
  const {
    clickOutSide,
    calendarYear,
    calendarMonth,
    cancelDelete,
    deleteCalendar,
  } = useDeleteCalendarModal();

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
            onClick={cancelDelete}
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
