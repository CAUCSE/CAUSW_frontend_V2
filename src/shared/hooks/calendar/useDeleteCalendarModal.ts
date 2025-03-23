"use client";

import { CalendarService, useCalendarStore } from "@/shared";

import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export const useDeleteCalendarModal = () => {
  const { calendarId, calendarMonth, calendarYear, isModalOpen, closeModal } =
    useCalendarStore(
      useShallow((state) => ({
        calendarId: state.calendarId,
        calendarYear: state.calendarYear,
        calendarMonth: state.calendarMonth,
        isModalOpen: state.isModalOpen,
        closeModal: state.closeModal,
      })),
    );

  const { useDeleteCalendar } = CalendarService();
  const { mutate } = useDeleteCalendar();
  const clickOutSide = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    closeModal();
  };

  const cancelDelete = () => {
    closeModal();
  };

  const deleteCalendar = () => {
    mutate({ calendarId, calendarYear });
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isModalOpen, closeModal]);

  return {
    clickOutSide,
    cancelDelete,
    deleteCalendar,
    calendarYear,
    calendarMonth,
  };
};
