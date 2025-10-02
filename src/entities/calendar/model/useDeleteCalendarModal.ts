'use client';

import { useShallow } from 'zustand/react/shallow';

import { useCalendarStore, useDeleteCalendar } from '@/entities/calendar';

export const useDeleteCalendarModal = () => {
  const { calendarId, calendarMonth, calendarYear, closeDeleteModal } =
    useCalendarStore(
      useShallow((state) => ({
        calendarId: state.calendarId,
        calendarYear: state.calendarYear,
        calendarMonth: state.calendarMonth,
        closeDeleteModal: state.closeDeleteModal,
      })),
    );

  const { mutate } = useDeleteCalendar();

  const cancelDelete = () => {
    closeDeleteModal();
  };

  const deleteCalendar = () => {
    mutate({ calendarId, calendarYear });
  };

  return {
    closeDeleteModal,
    cancelDelete,
    deleteCalendar,
    calendarYear,
    calendarMonth,
  };
};
