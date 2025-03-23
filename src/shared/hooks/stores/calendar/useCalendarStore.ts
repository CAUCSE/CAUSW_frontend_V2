import { create } from "zustand";

interface CalendarStore {
  isModalOpen: boolean;
  calendarId: string;
  calendarYear: number;
  calendarMonth: number;
  openModal: () => void;
  closeModal: () => void;
  setCalendarId: (id: string) => void;
  setCalendarYear: (year: number) => void;
  setCalendarMonth: (month: number) => void;
  resetCalendar: () => void;
}

export const useCalendarStore = create<CalendarStore>((set) => ({
  isModalOpen: false,
  calendarId: "",
  calendarYear: new Date().getFullYear(),
  calendarMonth: 1,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  setCalendarId: (id) => set({ calendarId: id }),
  setCalendarYear: (year) => set({ calendarYear: year }),
  setCalendarMonth: (month) => set({ calendarMonth: month }),
  resetCalendar: () =>
    set({
      calendarId: "",
      calendarYear: new Date().getFullYear(),
      calendarMonth: 1,
      isModalOpen: false,
    }),
}));
