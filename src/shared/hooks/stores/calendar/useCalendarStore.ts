import { create } from 'zustand';

interface CalendarStore {
  isDeleteModalOpen: boolean;
  isAddModalOpen: boolean;
  calendarId: string;
  calendarYear: number;
  calendarMonth: number;
  setCalendarId: (id: string) => void;
  setCalendarYear: (year: number) => void;
  setCalendarMonth: (month: number) => void;
  openDeleteModal: () => void;
  closeDeleteModal: () => void;
  openAddModal: () => void;
  closeAddModal: () => void;
  resetCalendar: () => void;
}

export const useCalendarStore = create<CalendarStore>(set => ({
  isDeleteModalOpen: false,
  isAddModalOpen: false,
  calendarId: '',
  calendarYear: new Date().getFullYear(),
  calendarMonth: 1,
  setCalendarId: id => set({ calendarId: id }),
  setCalendarYear: year => set({ calendarYear: year }),
  setCalendarMonth: month => set({ calendarMonth: month }),
  openDeleteModal: () => set({ isDeleteModalOpen: true }),
  closeDeleteModal: () => set({ isDeleteModalOpen: false }),
  openAddModal: () => set({ isAddModalOpen: true }),
  closeAddModal: () => set({ isAddModalOpen: false }),
  resetCalendar: () =>
    set({
      calendarId: '',
      calendarYear: new Date().getFullYear(),
      calendarMonth: 1,
      isDeleteModalOpen: false,
      isAddModalOpen: false,
    }),
}));
