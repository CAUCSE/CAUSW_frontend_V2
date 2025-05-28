import { create } from 'zustand';

interface BoardState {
  boardName: string;
  boardDescription: string;
  allowAnonymous: boolean;
  selectedRoles: string[];
  isNameValid: boolean;
  setBoardName: (name: string) => void;
  setBoardDescription: (description: string) => void;
  toggleAllowAnonymous: () => void;
  setSelectedRoles: (roles: string[]) => void;
  toggleRole: (roleEnums: string[]) => void;
  toggleAnyRole: () => void;
  setIsNameValid: (isValid: boolean) => void;
  clearBoardInfo: () => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  boardName: '',
  boardDescription: '',
  allowAnonymous: false,
  selectedRoles: ['ALL'],
  isNameValid: true,
  clearBoardInfo: () => {
    set({ boardName: '', boardDescription: '', allowAnonymous: false, selectedRoles: ['ALL'] });
  },
  setBoardName: (name) => set({ boardName: name }),
  setBoardDescription: (description) => set({ boardDescription: description }),
  toggleAllowAnonymous: () => set((state) => ({ allowAnonymous: !state.allowAnonymous })),
  setSelectedRoles: (roles) => set({ selectedRoles: roles }),
  toggleRole: (roleEnums) =>
    set((state) => {
      let updatedRoles = [...state.selectedRoles];
      if (updatedRoles.includes('ALL')) {
        updatedRoles = updatedRoles.filter((role) => role !== 'ALL');
      }
      const allSelected = roleEnums.every((enumRole) => updatedRoles.includes(enumRole));
      if (allSelected) {
        updatedRoles = updatedRoles.filter((enumRole) => !roleEnums.includes(enumRole));
      } else {
        updatedRoles = [...updatedRoles, ...roleEnums.filter((enumRole) => !updatedRoles.includes(enumRole))];
      }

      return { selectedRoles: updatedRoles };
    }),
  toggleAnyRole: () =>
    set((state) => ({
      selectedRoles: state.selectedRoles.includes('ALL') ? [] : ['ALL'],
    })),
  setIsNameValid: (isValid) => set({ isNameValid: isValid }),
}));
