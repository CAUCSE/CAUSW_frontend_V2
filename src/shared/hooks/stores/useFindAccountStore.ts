import { create } from 'zustand';

interface FindAccountStore {
  studentId: string;
  name: string;
  email: string;
  setStudentId: (studentId: string) => void;
  setName: (name1: string) => void;
  setEmail: (email: string) => void;
  resetFindAccountStore: () => void;
}

export const useFindAccountStore = create<FindAccountStore>(set => ({
  studentId: '',
  name: '',
  email: '',
  setStudentId: studentId => set({ studentId }),
  setName: name => set({ name }),

  setEmail: email => set({ email }),
  resetFindAccountStore: () =>
    set({
      studentId: '',
      name: '',
      email: '',
    }),
}));
