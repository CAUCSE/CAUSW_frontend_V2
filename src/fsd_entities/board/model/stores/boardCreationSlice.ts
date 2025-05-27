import { type StateCreator } from 'zustand';

type TRoleList = User.Role | 'ALL';

interface BoardCreationState {
  boardName: string;
  boardDescription: string;
  allowAnonymous: boolean;
  selectedRoleList: TRoleList[];
}

interface BoardCreationAction {
  setBoardName: (boardName: string) => void;
  setBoardDescription: (boardDescription: string) => void;
  setAllowAnonymous: (allowAnonymous: boolean) => void;
  setSelectedRoleList: (selectedRoleList: TRoleList[]) => void;
  resetBoardCreation: () => void;
}

export type BoardCreationSlice = BoardCreationState & BoardCreationAction;

export const createBoardCreationSlice: StateCreator<BoardCreationSlice, [], [], BoardCreationSlice> = (set) => ({
  boardName: '',
  boardDescription: '',
  allowAnonymous: false,
  selectedRoleList: ['ALL'],
  setBoardName: (boardName) => set({ boardName }),
  setBoardDescription: (boardDescription) => set({ boardDescription }),
  setAllowAnonymous: (allowAnonymous) => set({ allowAnonymous }),
  setSelectedRoleList: (selectedRoleList) => set({ selectedRoleList }),
  resetBoardCreation: () =>
    set({
      boardName: '',
      boardDescription: '',
      allowAnonymous: false,
      selectedRoleList: ['ALL'],
    }),
});
