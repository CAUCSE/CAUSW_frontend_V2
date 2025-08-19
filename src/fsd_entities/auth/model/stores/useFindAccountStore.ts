import { create } from 'zustand';

interface FindAccountStore {
  phoneNumber: string;
  name: string;
  email: string;
  setPhoneNumber: (phoneNumber: string) => void;
  setName: (name1: string) => void;
  setEmail: (email: string) => void;
  resetFindAccountStore: () => void;
}

export const useFindAccountStore = create<FindAccountStore>((set) => ({
  phoneNumber: '',
  name: '',
  email: '',
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setName: (name) => set({ name }),

  setEmail: (email) => set({ email }),
  resetFindAccountStore: () =>
    set({
      phoneNumber: '',
      name: '',
      email: '',
    }),
}));
