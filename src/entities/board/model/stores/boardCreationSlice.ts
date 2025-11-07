import { type StateCreator } from 'zustand';

type TRoleList = User.Role | 'ALL';

interface BoardCreationState {
  boardName: string;
  boardDescription: string;
  allowAnonymous: boolean;
  isAlumni: boolean;
  selectedRoleList: TRoleList[];
}

interface BoardCreationAction {
  setBoardName: (boardName: string) => void;
  setBoardDescription: (boardDescription: string) => void;
  setAllowAnonymous: (allowAnonymous: boolean) => void;
  setIsAlumni: (isAlumni: boolean) => void;
  setSelectedRoleList: (selectedRoleList: TRoleList[]) => void;
  resetBoardCreation: () => void;
}

export type BoardCreationSlice = BoardCreationState & BoardCreationAction;

export const createBoardCreationSlice: StateCreator<
  BoardCreationSlice,
  [],
  [],
  BoardCreationSlice
> = (set) => ({
  boardName: '',
  boardDescription: '',
  allowAnonymous: false,
  isAlumni: false,
  selectedRoleList: ['ALL'],
  setBoardName: (boardName) => set({ boardName }),
  setBoardDescription: (boardDescription) => set({ boardDescription }),
  setAllowAnonymous: (allowAnonymous) => set({ allowAnonymous }),
  setIsAlumni: (isAlumni) => set({ isAlumni }),
  setSelectedRoleList: (selectedRoleList) => set({ selectedRoleList }),
  resetBoardCreation: () =>
    set({
      boardName: '',
      boardDescription: '',
      allowAnonymous: false,
      isAlumni: false,
      selectedRoleList: ['ALL'],
    }),
});
