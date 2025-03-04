import { create } from "zustand";

interface FindAccountStore {
  studentId: string;
  name: string;
  phoneNumber: string;
  email: string;
  setStudentId: (studentId: string) => void;
  setName: (name1: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setEmail: (email: string) => void;
  resetFindAccountStore: () => void;
}

export const useFindAccountStore = create<FindAccountStore>((set) => ({
  studentId: "",
  name: "",
  phoneNumber: "",
  email: "",
  setStudentId: (studentId) => set({ studentId }),
  setName: (name) => set({ name }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),

  setEmail: (email) => set({ email }),
  resetFindAccountStore: () =>
    set({
      studentId: "",
      name: "",
      phoneNumber: "",
      email: "",
    }),
}));
