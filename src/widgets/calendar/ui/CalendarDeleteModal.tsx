'use client';

import { useDeleteCalendarModal } from '@/entities/calendar';

import { PortalModal } from '@/shared';

export const CalendarDeleteModal = () => {
  const {
    calendarYear,
    calendarMonth,
    cancelDelete,
    deleteCalendar,
    closeDeleteModal,
  } = useDeleteCalendarModal();

  return (
    <PortalModal
      closeModal={closeDeleteModal}
      className="flex min-w-72 flex-col items-center gap-4 rounded-lg bg-white p-8"
    >
      <PortalModal.Header>
        <h1 className="text-xl">캘린더 삭제</h1>
      </PortalModal.Header>
      <PortalModal.Body>
        <p className="text-center text-red-500">
          {calendarYear}년 {calendarMonth}월 캘린더를 삭제하시겠습니까?
          <br />
          삭제하실 경우 다시 복구시킬 수 없습니다.
        </p>
      </PortalModal.Body>
      <PortalModal.Footer className="flex gap-4">
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
      </PortalModal.Footer>
    </PortalModal>
  );
};
