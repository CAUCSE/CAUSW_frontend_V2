import { create } from 'zustand';

interface LockerSelectionStore {
  clickedLockerStatus: 'isMine' | 'isActive' | 'isNotActive' | null;
  clickedLockerId: string | null;

  setClickedLockerStatus: (status: 'isMine' | 'isActive' | 'isNotActive' | null) => void;
  setClickedLockerId: (id: string | null) => void;
}

export const useLockerSelectionStore = create<LockerSelectionStore>((set) => ({
  clickedLockerStatus: null,
  clickedLockerId: null,

  setClickedLockerStatus: (status) => set({ clickedLockerStatus: status }),
  setClickedLockerId: (id) => set({ clickedLockerId: id }),
}));
