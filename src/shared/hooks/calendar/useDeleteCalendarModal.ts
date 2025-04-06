'use client';

import { useShallow } from 'zustand/react/shallow';

import { CalendarService, useCalendarStore } from '@/shared';

export const useDeleteCalendarModal = () => {
  const { calendarId, calendarMonth, calendarYear, closeDeleteModal } = useCalendarStore(
    useShallow(state => ({
      calendarId: state.calendarId,
      calendarYear: state.calendarYear,
      calendarMonth: state.calendarMonth,
      closeDeleteModal: state.closeDeleteModal,
    })),
  );

  const { useDeleteCalendar } = CalendarService();
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
